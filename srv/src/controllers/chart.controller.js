 import Task from '../model/task.model';
import Chart from '../model/chart.model';
import { getTaskById, getTasks } from './task.controller';

const vetor =

    class Chart {
        constructor(type) {
            this.totalTasks = null;
            this.typeChart = type;
            this.idTimer = null;
        }
    }

export async function pieChart(request, reply) {
    try {
        const chartPie = {
            Completed: 0,
            Pending:0,
        };

        const task = await getTasks(request, reply);
        if (task) { 
            reply.code(200).send({ message: 'tarefas encontradas: ' + task.tasks }) 
        };
        const taskCompleted = await Task.findAll({ where: { status: 'completed' + task.tasks.id_task } });
        const taskPending = await Task.findAll({ where: { status: 'pending || in-progress' + 
            task.tasks.id_task } });

        if (taskCompleted){
            
        }


        return chartPie
        
    } catch (error) { 

    };

    async function chartWeek(request, reply) {
        try {
            const task = getTasks(request, reply)
        } catch (error) {

        }
    }