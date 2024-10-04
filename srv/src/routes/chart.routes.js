import { pieChart } from '../controllers/chart.controller.js';

async function chartRoutes(fastify, options){
    fastify.get('/chart-pie', async (request,reply) => {
        try {
         await pieChart(request,reply);
        } catch (error) {
         console.error(error);
         reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    })
}

export default chartRoutes;