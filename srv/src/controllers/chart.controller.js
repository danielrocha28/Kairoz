import Task from '../model/task.model.js';
import Timer from '../model/timer.model.js';
import Chart from '../model/chart.model.js';
import { getTaskById, getTasks } from './task.controller.js';
import { Op } from 'sequelize';
import { getTime } from './timer.controller.js';

    class newChart {
        constructor(type) {
            this.totalTasks = null;
            this.typeChart = type;
            this.totalTime = null;
            this.days = {dom,seg,ter,qua,qui,sex,sab};
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
        id_chart,
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
      message: error.message});
  }
}

    async function chartWeek(request, reply) {
        try {
          const weekChart = new newChart('week');

            const totalTasks = await getTasks(request, reply);
            const totalTime = await getTime(request, reply);

          if(totalTasks.id_task === totalTime.id_task){
            reply.status(200).send(`Total de tempo: ${totalTime}`);
          }
          switch (totalTime.day_update.lenght){
            case 'seg':
              weekChart.days.seg = totalTime;
            break;
            case 'ter':
              weekChart.days.ter = totaltime
            } 



        } catch (error) {

        }
    }