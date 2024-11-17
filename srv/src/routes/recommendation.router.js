import { newRecommendation } from '../controllers/recommendation.controller';
import logger from '../config/logger';

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
                title: newRecommendation.response.title,
                summary: newRecommendation.response.summary,
                image: newRecommendation.response.image,
                link: newRecommendation.response.link,
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