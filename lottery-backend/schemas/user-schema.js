import { z } from 'zod'

const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

const userLogoutSchema = z.object({
  email: z.string().email()
})

export { userLoginSchema, userLogoutSchema }
