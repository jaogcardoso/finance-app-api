import { z } from 'zod'

export const createUserSchema = z.object({
  first_name: z
    .string({
      required_error: 'First name is required.',
    })
    .trim()
    .min(1, {
      message: 'First name is required.',
    }),
  last_name: z
    .string({
      required_error: 'First name is required.',
    })
    .trim()
    .min(1, {
      message: 'Last name is required.',
    }),
  email: z
    .email({
      required_error: 'E-mail is invalid our in use.',
    })
    .min(1)
    .trim(),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .trim()
    .min(6, {
      message: 'Password to small.',
    }),
})

export const updateUserSchema = createUserSchema.partial().strict()
