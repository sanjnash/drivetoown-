import { z } from 'zod';

export const quoteSchema = z.object({
  carId: z.string().min(1, 'Please select a car'),
  planType: z.enum(['flexi', 'flexi-own']),
  contractYears: z.number().int().min(1).max(4),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;
