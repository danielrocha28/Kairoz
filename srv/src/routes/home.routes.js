import dotenv from 'dotenv';

dotenv.config();

const isValidApiKey = (apiKey) => {
    const key = process.env.NODE_API_KEY;
     return apiKey === key;
};

const homeRouter = (fastify, options, done) => {

  fastify.get('/', {
    preHandler: (request, reply) => {
    const apiKey = request.headers['api-key'];
    if (!isValidApiKey(apiKey)) {
        reply.status(403).send({ error: 'API Key inválida ou app não autorizado.' });
    }
    },
    handler: (request, reply) => {
      reply.status(200).send('Welcome to the Kairoz App');
    }
  });

  done();
};

export default homeRouter;