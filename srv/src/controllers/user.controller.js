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
  try {
    const validatedData = registerSchema.parse(request.body);
    const { name, email, password } = validatedData;

    // Verifica se o email já está em uso
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return reply.status(400).send({ error: 'Email já está sendo utilizado' });
    }

     const hashedPassword = await bcrypt.hash(password, 10);

    const dadosDoUsuario = {
      name: request.body.name,
      email: request.body.email,
      password: hashedPassword,// O await resolve a Promise
    };

    const user = await User.create(dadosDoUsuario);

    reply.status(201).send({
      message: 'Usuário registrado com sucesso',
      user: {
        id: user.id_usuario, // Corrige o campo para o ID correto
        name: user.name,
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
};


  async function loginUser(fastify, opts) {
          try {
        const validatedData = loginSchema.parse(request.body);
        const { email, password } = validatedData;

        // Use await directly with async function
        const user = await User.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
          // Await bcrypt.compare
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          reply.send({ token });
        } else {
          reply.status(401).send({ error: "Credenciais inválidas" });
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          reply
            .status(400)
            .send({ error: "Falha na validação", details: error.errors });
        } else {
          console.error("Erro ao fazer login:", error);
          reply
            .status(500)
            .send({
              error: "Erro interno do servidor",
              message: error.message,
            });
        }
      }
    };
  

 module.exports = {
  registerUser,
  loginUser,
};