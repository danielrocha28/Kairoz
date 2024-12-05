import { pieChart, chartWeek } from '../controllers/chart.controller.js';
import logger from '../config/logger.js'; 

const chartRoutes = (fastify, options, done) => {
    fastify.get('/chart-pie', async (request,reply) => {
        try {
         await pieChart(request,reply);
        } catch (error) {
         logger.error(error);
         reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });

    fastify.get('/chart-week', async (request,reply) => {
        try {
         await chartWeek(request,reply);
        } catch (error) {
         logger.error(error);
         reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });
    
    done();
};

export default chartRoutes;