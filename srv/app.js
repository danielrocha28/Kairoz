const Fastify = require('fastify');
const fastify = Fastify({ logger: true });
const userRoutes = require('./src/routes/user.routes');


//fastify.register(userRoutes);
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
