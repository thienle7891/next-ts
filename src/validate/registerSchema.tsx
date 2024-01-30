import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z.string().min(1, { message: 'Username is required' }),
    name: z.string().min(1, { message: 'Name is required' }),
    // email: z.string().email(),
    password: z.string().min(8).max(20),
    confirm_password: z
      .string()
      .min(1, { message: 'Password confirmation is required' }),
  })
  .superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirm_password'],
      });
    }
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
