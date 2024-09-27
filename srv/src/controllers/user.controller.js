
import User from '../model/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerSchema, loginSchema } from '../validators/user.schema.js';
import dns from 'dns';
import { promisify } from 'util';

const resolveMxAsync = promisify(dns.resolveMx);



// Validation for user registration
const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

async function validateEmailDomain(email) {
  const domain = email.split('@')[1];
  try {
    const mxRecords = await resolveMxAsync(domain);
    return mxRecords && mxRecords.length > 0;
  } catch (error) {
    return false;
  }
}

export async function registerUser(request, reply) {
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
      console.error('Error registering user:', error);
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
export function  googleCallback(request,reply) {

  //verifica se o usuario é valido, se é autentico
  try{ if(!req.user) {
    return resizeBy.status(401).json({error: 'Usuario invalido'});
  }

  //gera o jwt
    const tokenGoogle = jwt.sign({
      id: request.user.id, 
      email: request.user.email},
      JWT_SECRET_KEY,
      {expiresin:'3h'}
    );
    
    reply.json({tokenGoogle});//devolve o jwt gerado

  }catch (error){
console.error('Erro ao gerar o jwt do login com google');
  }

}