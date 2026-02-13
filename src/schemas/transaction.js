import { z } from 'zod'
import validator from 'validator'
export const createTransactionSchema = z.object({
  user_id: z.uuid({
    message: 'User ID must be a valid uuid',
  }),
  name: z
    .string({
      required_error: 'Name is required',
    })
    .trim()
    .min(1, {
      message: 'Name is required.',
    }),
  date: z.string().datetime({
    message: 'Date must be a valid'
  }),
  type: z.enum(['EXPENSE', 'EARNING', 'INVESTMENT']),
  value: z
    .number({
      invalid_type_error: ' Value must be a number.',
    })
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
