export default function homeRouter(fastify, options) {
  fastify.get('/', (request, reply) => {
    return 'Bem vindo ao app Kairoz';
  });
}
