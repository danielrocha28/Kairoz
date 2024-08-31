const User = require('../model/user.model');
const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

 function registerUser(fastify,opts) {(request, reply) => {
  try {
    const validatedData = loginSchema.parse(request.body);
    const { email, password } = validatedData;

    const existingUser = async(User.findOne({ where: { email } }));
    if (existingUser) {
      return reply.status(400).send({ error: 'Email já está sendo utilizado' });
    }

    const hashedPassword = async(bcrypt.hash(password, 10));

    const user = async(User.create({ email, password: hashedPassword }));

    reply.status(201).send({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply.status(400).send({ error: 'Validation failed', details: error.errors });
    } else {
      console.error(error);
      reply.status(500).send({ error: 'Internal server error', message: error.message });
    }
  }
};
}

  function loginUser(fastify,opts){ (request, reply) => {
   try {
    const validatedData = loginSchema.parse(request.body);
    const { email, password } = validatedData;

    const user = async(User.findOne({ where: { email } }));
    if (user && async(bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      reply.send({ token });
    } else {
      reply.status(401).send({ error: 'Invalid credentials' });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply.status(400).send({ error: 'Validation failed', details: error.errors });
    } else {
      console.error(error);
      reply.status(500).send({ error: 'Internal server error', message: error.message });
    }
  }
}};

 module.exports = {
  registerUser,
  loginUser,
};