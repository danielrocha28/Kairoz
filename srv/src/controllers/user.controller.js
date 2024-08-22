const User = require('../model/user.model');
const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerUser = async (request, reply) => {
  try {
    const validatedData = loginSchema.parse(request.body);
    const { email, password } = validatedData;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    reply.status(201).send(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply.status(400).send(error.errors);
    } else {
      reply.status(500).send(error.message);
    }
  }
};

const loginUser = async (request, reply) => {
  try {
    const validatedData = loginSchema.parse(request.body);
    const { email, password } = validatedData;

    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      reply.send({ token });
    } else {
      reply.status(401).send('Invalid credentials');
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply.status(400).send(error.errors);
    } else {
      reply.status(500).send(error.message);
    }
  }
};

module.exports = {
  registerUser,
  loginUser,
};
