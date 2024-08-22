const fastify = require('fastify');
const userRoutes = require('./src/routes/user.routes');


const app = fastify();
app.register(userRoutes);

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
