import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(/[^A-Za-z0-9]/, 'Password must contain a special character'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const updatedSchema = z.object({
  email: z.string().email('Invalid email').optional(),
  name: z.string().min(1, 'Name is required').optional(),
  password:  z.string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(/[^A-Za-z0-9]/, 'Password must contain a special character').optional(),
});

export { registerSchema, loginSchema, updatedSchema };
