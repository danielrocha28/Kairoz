import Task from '../model/task.model.js';
import Chart from '../model/chart.model.js';
import { getTasks } from './task.controller.js';
import { Op } from 'sequelize';
import { getTime } from './timer.controller.js';

class newChart {
  constructor(type) {
    this.totalTasks = null;
    this.typeChart = type;
    this.totalTime = null;
    this.days = { dom, seg, ter, qua, qui, sex, sab };
  }
}

export async function pieChart(request, reply) {
  try {
    const chartPie = {
      Completed: 0,
      Pending: 0,
      Total: 0
    };

    const task = await getTasks(request, reply);

    if (!task) {
      return reply.code(404).send({ message: 'No tasks found.' });
    }

    const newPiechart = await Chart.create({
      type: pie
    });

    // Count tasks with status 'completed'
    const taskCompleted = await Task.count({ where: { status: 'completed',
        id_task: task.tasks.id_task }});

    // Count tasks with status 'pending' or 'in-progress'
    const taskPending = await Task.count({ where: { status: { [Op.or]: ['pending', 'in-progress'] },
        id_task: task.tasks.id_task }});

    // Updating the pie chart values
    chartPie.Completed += taskCompleted;
    chartPie.Pending += taskPending;
    chartPie.Total = chartPie.Completed + chartPie.Pending;

    return reply.code(200).send(newPiechart, chartPie);
  } catch (error) {
    console.error('Error generating pie chart:', error);
    return reply.code(500).send({ error: 'An error occurred while generating the chart data',
      message: error.message });
  }
}

// Pie chart with total task time for the days of the week
export async function chartWeek(request, reply) {
  try {
    const weekChart = new newChart('week');

    const task = await getTasks(request, reply); // Fetch all tasks
    const timer = await getTime(request, reply); // Fetch total time
    // Check if the task ID matches the timer ID
    if (task.id_task === timer.id_task) {
      await Chart.create({
        id_task: task.id_task,
        id_time: timer.id_time,
        type: weekChart.type,
      });
      
      // Field responsible for capturing timer updates according to the day
      switch (timer.day_update) {
        case 'dom':
          weekChart.days.dom = timer.total_time;
          break;
        case 'seg':
          weekChart.days.seg = timer.total_time;
          break;
        case 'ter':
          weekChart.days.ter = timer.total_time;
          break;
        case 'qua':
          weekChart.days.qua = timer.total_time;
          break;
        case 'qui':
          weekChart.days.qui = timer.total_time;
          break;
        case 'sex':
          weekChart.days.sex = timer.total_time;
          break;
        case 'sab':
          weekChart.days.sab = timer.total_time;
          break;
        default:
          reply.status(500).send('Could not proceed');
      }
    }
    return weekChart.days;
  } catch (error) {
    console.error('Error generating chart week:', error);
    return reply.code(500).send({ error: 'An error occurred while generating the chart data',
      message: error.message });
  }
}