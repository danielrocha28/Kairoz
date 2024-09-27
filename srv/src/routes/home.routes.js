export default async function homeRouter(fastify, options) {
  fastify.get('/', async (request, reply) => {
    return 'Bem vindo ao app Kairoz';
  });
}