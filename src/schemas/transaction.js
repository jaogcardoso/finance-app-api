import { z } from 'zod'
import validator from 'validator'
export const createTransactionSchema = z.object({
  user_id: z.string().uuid(),
  name: z.string().trim().min(1, {
    message: 'Name is required.',
  }),
  date: z.coerce.date(),
  type: z.enum(['EXPENSE', 'EARNING', 'INVESTMENT']),
  value: z
    .number()
    .min(1, {
      message: 'Value must be greater than 0.',
    })
    .refine((value) =>
      validator.isCurrency(value.toFixed(2), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
      }),
    ),
})
