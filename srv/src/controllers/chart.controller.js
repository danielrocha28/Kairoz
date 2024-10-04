import Task from '../model/task.model';
import Timer from '../model/timer.model';
import Chart from '../model/chart.model';
import { getTaskById, getTasks } from './task.controller';
import { Op } from 'sequelize';
import { getTime } from './timer.controller';

    class Chart {
        constructor(type) {
            this.totalTasks = getTasks.tasks
            this.typeChart = type;
            this.idTimer = null;
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

    /*async function chartWeek(request, reply) {
        try {
            const task = await getTasks(request, reply);
            const totalTime = await getTime(request, reply);

          if(task.id_task === totalTime.id_task){
          }
        } catch (error) {

        }
    }*/