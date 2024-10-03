import Task from '../model/task.model';
import Chart from '../model/chart.model';
import { getTaskById, getTasks } from './task.controller';
import { Op } from 'sequelize';

const vetor =

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

    return reply.code(200).send(chartPie);
  } catch (error) {
    console.error('Error generating pie chart:', error);
    return reply.code(500).send({ error: 'An error occurred while generating the chart data',
      message: error.message});
  }
}

    async function chartWeek(request, reply) {
        try {
            const task = getTasks(request, reply)
        } catch (error) {

        }
    }