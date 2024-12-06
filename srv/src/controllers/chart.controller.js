import Task from '../model/task.model.js';
import Chart from '../model/chart.model.js';
import { getTasks } from '../controllers/task.controller.js';
import { getTotalTime } from '../controllers/timer.controller.js';
import { Op } from 'sequelize';
import logger from '../config/logger.js'; 
import cron from 'node-cron';

class NewChart {
  constructor(type) {
    this.tasks = null;
    this.typeChart = type;
    this.chart = null;
  }
}
  
export async function pieChart(request, reply) {
  try {

    const task = await getTasks(request, reply);

    if (!task) {
      return reply.code(404).send({ message: 'No tasks found.' });
    }

    const Pie = new NewChart('pie');

      Pie.chart = {
        Completed: 0,
        Pending: 0,
        Total: 0,
      };

    await Chart.create({ type: Pie.typeChart, });
    cron.schedule('0 0 * * *', async () => {
    // Count tasks with status 'completed'
    const taskCompleted = await Task.count({
      where: { status: 'completed', id_task: task.tasks.id_task }
    });
  
    // Count tasks with status 'pending' or 'in-progress'
    const taskPending = await Task.count({
      where: { 
        status: { [Op.or]: ['pending', 'in-progress'] },
        id_task: task.tasks.id_task 
      }
    });

    // Updating the pie chart values
    Pie.chart.Completed += taskCompleted;
    Pie.chart.Pending += taskPending;
    Pie.chart.Total = Pie.chart.Completed + Pie.chart.Pending;

    return reply.code(200).send(Pie.chart);
  });
  } catch (error) {
    logger.error('Error generating pie chart:', error);
    return reply.code(500).send({ 
      error: 'An error occurred while generating the chart data',
      message: error.message 
    });
  }
}

// Column chart with total task time for the days of the week
export async function chartWeek(request, reply) {
  try {
    const weekly = new NewChart('week');

    weekly.chart = {
      dom: null,
      seg: null,
      ter: null,
      qua: null,
      qui: null,
      sex: null,
      sab: null,
    };
    
    await cron.schedule('40-59 23 * * *', async () => {
      weekly.tasks = await getTasks(request, reply); // Fetch all tasks

      if (!weekly.tasks) {
        return reply.status(404).send('Tasks not found.');
      }

      // Check if the task ID matches the timer ID
      if (weekly.tasks.id_task && weekly.tasks.total_time !== '00:00:00') {
        await Chart.create({
          id_task: weekly.tasks.id_task,
          type: weekly.typeChart,
        });
        let totalTime = await getTotalTime(request,reply);

        // Field responsible for capturing timer updates according to the day
        switch (weekly.timer.day_update) {
          case 'dom':
            weekly.chart.dom = 0;
            weekly.chart.dom = totalTime - weekly.chart.sab;
            break;
          case 'seg':
            weekly.chart.seg = 0;
            weekly.chart.seg = totalTime - weekly.chart.dom;
            break;
          case 'ter':
            weekly.chart.ter = 0;
            weekly.chart.ter = totalTime - weekly.chart.seg;
            break;
          case 'qua':
            weekly.chart.qua = 0;
            weekly.chart.qua = totalTime - weekly.chart.ter;
            break;
          case 'qui':
            weekly.chart.qui = 0;
            weekly.chart.qui = totalTime - weekly.chart.qua;
            break;
          case 'sex':
            weekly.chart.sex = 0;
            weekly.chart.sex = totalTime - weekly.chart.qui;
            break;
          case 'sab':
            weekly.chart.sab = 0;
            weekly.chart.sab = totalTime - weekly.chart.sex;
            break;
          default:
            return reply.status(500).send('Could not proceed');
        }
      }
      return reply.status(200).send(weekly.chart);
    });
  } catch (error) {
    logger.error('Error generating chart week:', error);
    return reply.code(500).send({ 
      error: 'An error occurred while generating the chart data',
      message: error.message 
    });
  }
}