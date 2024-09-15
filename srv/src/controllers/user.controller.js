<<<<<<< HEAD
const User = require('../model/user.model');
const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

async function registerUser(request, reply) {
=======
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
>>>>>>> 4a152a40d614e80974ab4c402cffcf18b9f86314
  try {
    const validatedData = registerSchema.parse(request.body);
    const { name, email, password } = validatedData;

<<<<<<< HEAD
    // Verifica se o email já está em uso
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return reply.status(400).send({ error: 'Email já está sendo utilizado' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário
    const user = await User.create({ name, email, password: hashedPassword });

    reply.status(201).send({
      message: 'Usuário registrado com sucesso',
      user: {
        id: user.id_usuario, // Corrige o campo para o ID correto
=======
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
>>>>>>> 4a152a40d614e80974ab4c402cffcf18b9f86314
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
<<<<<<< HEAD
      reply.status(400).send({ error: 'Falha na validação', details: error.errors });
    } else {
      console.error('Erro ao registrar usuário:', error);
      reply.status(500).send({ error: 'Erro interno do servidor', message: error.message });
=======
      reply.status(400).send({ error: 'Validation failed', details: error.errors });
    } else {
      console.error('Error registering user:', error);
      reply.status(500).send({ error: 'Internal server error', message: error.message });
>>>>>>> 4a152a40d614e80974ab4c402cffcf18b9f86314
    }
  }
}

<<<<<<< HEAD
async function loginUser(request, reply) {
=======
// Function to log in a user
export async function loginUser(request, reply) {
>>>>>>> 4a152a40d614e80974ab4c402cffcf18b9f86314
  try {
    const validatedData = loginSchema.parse(request.body);
    const { email, password } = validatedData;

<<<<<<< HEAD
    // Verifica se o usuário existe
    const user = await User.findOne({ where: { email } });

    // Verifica se a senha está correta e gera um token
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.ID_usuario }, process.env.JWT_SECRET, { expiresIn: '8h' });
      reply.send({ token });
    } else {
      reply.status(401).send({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply.status(400).send({ error: 'Falha na validação', details: error.errors });
    } else {
      console.error('Erro ao fazer login:', error);
      reply.status(500).send({ error: 'Erro interno do servidor', message: error.message });
    }
  }
}

module.exports = {
  registerUser,
  loginUser,
};
=======
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
>>>>>>> 4a152a40d614e80974ab4c402cffcf18b9f86314
