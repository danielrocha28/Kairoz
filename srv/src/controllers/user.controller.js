
import User from '../model/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerSchema, loginSchema, updatedSchema } from '../validators/user.schema.js';
import dns from 'dns';
import { promisify } from 'util';
import logger from '../config/logger.js';
import { z } from 'zod';

const resolveMxAsync = promisify(dns.resolveMx);

async function validateEmailDomain(email) {
  const domain = email.split('@')[1];
  try {
    const mxRecords = await resolveMxAsync(domain);
    return mxRecords && mxRecords.length > 0;
  } catch (error) {
    logger.error(`Failed to resolve MX records for domain: ${domain}. Error: ${error.message}`);
    return false;
  }
}

export async function registerUser(request  , reply) {
  try {
    const validatedData = registerSchema.parse(request.body);
    const { name, email, password } = validatedData;

    const isValidDomain = await validateEmailDomain(email);
    if (!isValidDomain) {
      return reply.status(400).send({ error: 'Invalid email domain' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return reply.status(400).send({ error: 'Email is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
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
      logger.error('Error registering user:', error);
      reply.status(500).send({ error: 'Internal server error', message: error.message });
    }
  }
}

export async function loginUser(request, reply) {
  try {
    const validatedData = loginSchema.parse(request.body);
    const { email, password } = validatedData;

    const user = await User.findOne({ where: { email } });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id_user }, process.env.JWT_SECRET, { expiresIn: '8h' });
      return ({ token });
    } else {
      reply.status(401).send({ error: 'Invalid credentials' });
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      reply.status(400).send({ error: 'Validation failed', details: error.errors });
    } else {
      logger.error('Error logging in:', error);
      reply.status(500).send({ error: 'Internal server error', message: error.message });
    }
  }
}

export const getUserByID = async (token) => {
  const decodedUser = jwt.decode(token);
    
  const user = await User.findOne({ where: {
    id_user: decodedUser.id }
  });

  return {
    id: user.id_user,
    name: user.name,
    email: user.email,
  };
};

export async function updateProfile(request, reply){
  try {
    const user = loginUser(request,reply);
    const validatedData = updatedSchema.parse(request.body);

    if (validatedData.email){
      const validEmail = validateEmailDomain(validatedData.email);
      if (!validEmail) {
        return reply.status(400).send({ error: 'Invalid email domain' });
      }
    }

    const [updated] = await User.update(validatedData, { where: { id_user: user.id } }); 
    if (updated) {
      const updatedUser = await User.findByPk(user.id); 
      reply.code(200).send(updatedUser);
    } else {
      reply.code(404).send({ error: `${user.name}, Unable to update profile` });
    }
  } catch (error) {
    logger.error('error when updating profile:', error);
    reply.status(500).send({ error: 'Internal server error', message: error.message });
  }
}

export async function deleteProfile(request, reply) {
  try {
    const user = loginUser(request, reply);

    const deleted = await User.destroy({ where: { id_user: user.id } }); 
    if (deleted) {
      reply.code(204).send('I hope to see you again');  
    } else {
      reply.code(404).send({ error: `${user.name}, Unable to deleted profile` });
    }
  } catch (error) {
    logger.error('error when deleting profile:', error);
    reply.status(500).send({ error: 'Internal server error', message: error.message });
  }
}