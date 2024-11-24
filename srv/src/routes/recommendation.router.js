import { newRecommendation } from '../controllers/recommendation.controller.js';
import logger from '../config/logger.js';

const recommendationRoutes = (fastify, options, done) => {

    fastify.post('/recommendation', async (request, reply) => {
        try {
            await newRecommendation(request, reply);
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });

    fastify.get('/recommendation', (request, reply) => {
        try {
            const response = {
                type: newRecommendation.type,
                link: newRecommendation.link,
            };
            reply.status(200).send(response);
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });

    done();
};

export default recommendationRoutes;