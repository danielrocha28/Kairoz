export default async function homeRouter(fastify, options) {
  console.log('Registrando a rota home');
  fastify.get('/kairoz.onrender.com/', async (request, reply) => {
    return "Bem vindo ao app Kairoz";
  });
}