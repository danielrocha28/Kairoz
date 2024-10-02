export default async function homeRouter(fastify, options) {
  fastify.get('/', async (request, reply) => {
    return 'Welcome to the Kairoz app';
  });
};