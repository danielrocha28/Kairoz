
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(/[^A-Za-z0-9]/, 'Password must contain a special character'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});
