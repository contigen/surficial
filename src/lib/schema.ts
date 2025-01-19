import { object, string } from 'zod'

export const loginSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, `Email is required`)
    .email(`Invalid email`),
  password: string({ required_error: 'Password is required' })
    .min(1, `Password is required`)
    .min(4, `Password must be more than 4 characters`),
})

export const registerSchema = loginSchema.merge(
  object({
    name: string({ required_error: `Name is required` }).min(
      1,
      `Name must not be empty`
    ),
  })
)
