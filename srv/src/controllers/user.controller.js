import User from '../model/user.model.js';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';




// Validation for user registration
const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Validation for user login
const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Function to register a new user
export async function registerUser(request, reply) {
  try {
    const validatedData = registerSchema.parse(request.body);
    const { name, email, password } = validatedData;

    // Check if the email is already in use
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return reply.status(400).send({ error: 'Email is already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({ name, email, password: hashedPassword });

    reply.status(201).send({
      message: 'User registered successfully',
      user: {
        id: user.id_user,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply.status(400).send({ error: 'Validation failed', details: error.errors });
    } else {
      console.error('Error registering user:', error);
      reply.status(500).send({ error: 'Internal server error', message: error.message });
    }
  }
}

// Function to log in a user
export async function loginUser(request, reply) {
  try {
    const validatedData = loginSchema.parse(request.body);
    const { email, password } = validatedData;

    // Check if the user exists
    const user = await User.findOne({ where: { email } });

    // Verify if the password is correct and generate a token
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id_user }, process.env.JWT_SECRET, { expiresIn: '8h' });
      reply.send({ token });
    } else {
      reply.status(401).send({ error: 'Invalid credentials' });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply.status(400).send({ error: 'Validation failed', details: error.errors });
    } else {
      console.error('Error logging in:', error);
      reply.status(500).send({ error: 'Internal server error', message: error.message });
    }
  }
}

//esta funçao é procesada apos a autentificaçao com o google, gera um jwt com o id e email

export function googleCallback(request, reply) {
  // Verifica se o usuário é válido, se é autêntico
  try {
    console.log('Usuário:', request.user);


    if (!request.user) {
      return reply.status(401).send({ error: 'Usuário inválido' });
    }

    // Acessa o ID e email do usuário
    const { id, email } = request.user;

    // Gera o JWT
    const tokenGoogle = jwt.sign(
      { id, email },
      JWT_SECRET_KEY,
      { expiresIn: '3h' }
    );

    console.log('Token do Google:', tokenGoogle);
    
    reply.send({ tokenGoogle });

  } catch (error) {
    console.error('Erro ao gerar o JWT do login com Google:', error);
    reply.status(500).send({ error: 'Erro interno ao gerar o token' });
  }
}

