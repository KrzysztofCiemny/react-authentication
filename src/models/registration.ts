import { z } from 'zod';

export const firstFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export const secondFormSchema = z.object({
  name: z.string().min(1),
  age: z.string().min(1),
});

export type FirstFormInputs = z.infer<typeof firstFormSchema>;
export type SecondFormInputs = z.infer<typeof secondFormSchema>;
