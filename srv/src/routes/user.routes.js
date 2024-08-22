const Fastify = require('fastify');
const fastify = Fastify({ logger: true });
const user  = require('../controllers/user.controller');



fastify.post('/register/:email', async (request, reply) => {const register = user.registerUser});


//fastify.post('/register', registerUser);

//fastify.post('/login', loginUser);


module.exports = user;
