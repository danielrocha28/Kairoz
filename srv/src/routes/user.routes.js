const Fastify = require('fastify');
const fastify = Fastify({ logger: true});
const user  = require('../controllers/user.controller');


async function userRouter(fastify,opts){ 

 fastify.post('/register/:email', async (request, reply) => {
  const { email } = request.params;
    await (user.registerUser,{ email }, reply)
 });

 fastify.post('/register', async (request,reply) => {
  const { email, password } = request.body;
   await user.registerUser({ email, password }, reply);
 });

 fastify.post('/login', async (request,reply,) => {
    const { email, password } = request.body;
    await user.loginUser({ email, password }, reply);
 });
}
module.exports = userRouter;