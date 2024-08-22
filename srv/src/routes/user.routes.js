const { registerUser, loginUser } = require('../controllers/user.controller');

async function userRoutes(fastify, options) {
  fastify.post('/register', registerUser);
  fastify.post('/login', loginUser);
}

module.exports = userRoutes;
