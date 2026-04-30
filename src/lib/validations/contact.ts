import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(
      /^(\+614|04)\d{8}$/,
      'Please enter a valid Australian mobile number (e.g. 0412 345 678)'
    ),
  city: z.string().optional().default('Melbourne'),
  carInterest: z.string().min(1, 'Please select a car or choose "Not sure yet"'),
  message: z
    .string()
    .min(10, 'Please enter at least 10 characters')
    .max(1000, 'Message must be under 1000 characters'),
  honeypot: z.string().max(0).optional(), // Spam trap — must be empty
});

export type ContactFormData = z.infer<typeof contactSchema>;
