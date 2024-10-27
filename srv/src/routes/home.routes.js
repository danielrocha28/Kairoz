const homeRouter = (fastify, options, done) => {
  fastify.get('/', (request, reply) => {
    return 'Bem vindo ao app Kairoz';
  });

  done();
};

export default homeRouter;
