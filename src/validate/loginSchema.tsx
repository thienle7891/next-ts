import * as z from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z
    .string()
    .min(8, { message: 'min aaaaa' })
    .max(20, { message: 'aaaaa' }),
});
export type LoginSchemaType = z.infer<typeof loginSchema>;
