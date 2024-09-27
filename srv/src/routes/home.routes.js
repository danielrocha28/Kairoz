export default async function homeRouter(fastify, options) {
  fastify.get('/kairoz.onrender.com/', async (request, reply) => {
    return "Bem vindo ao app Kairoz";
  });
}