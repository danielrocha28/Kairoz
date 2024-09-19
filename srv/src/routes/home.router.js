import fastify from 'fastify';

fastify.get('https://kairoz.onrender.com', async (request,reply) => {
    return 'Bem vindo ao app Kairoz';
});