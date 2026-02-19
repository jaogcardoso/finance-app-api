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

export const loginSchema = z.object({
    email: z.string().email({
      message: 'Please provide a valid e-mail.'
    }).trim().min(1,
      {message: 'E-mail is required.',}
    ),
    password: z.string().trim().min(6, {
      message: 'Password must have at least 6 characters'
    })

})
