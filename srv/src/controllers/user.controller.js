import User from '../model/user.model.js';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Validação para o registro do usuário
const registerSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

// Validação para o login do usuário
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

async function registerUser(request, reply) {
  try {
    const validatedData = registerSchema.parse(request.body);
    const { nome, email, senha } = validatedData;

    // Verifica se o email já está em uso
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return reply.status(400).send({ error: 'Email já está sendo utilizado' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria o novo usuário
    const user = await User.create({ nome, email, senha: hashedPassword });

    reply.status(201).send({
      message: 'Usuário registrado com sucesso',
      user: {
        id: user.id_usuario, // Corrige o campo para o ID correto
        nome: user.nome,
        email: user.email,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply.status(400).send({ error: 'Falha na validação', details: error.errors });
    } else {
      console.error('Erro ao registrar usuário:', error);
      reply.status(500).send({ error: 'Erro interno do servidor', message: error.message });
    }
  }
}

async function loginUser(request, reply) {
  try {
    const validatedData = loginSchema.parse(request.body);
    const { email, senha } = validatedData;

    // Verifica se o usuário existe
    const user = await User.findOne({ where: { email } });

    // Verifica se a senha está correta e gera um token
    if (user && await bcrypt.compare(senha, user.senha)) {
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

export default {
  registerUser,
  loginUser,
};
