import 'server-only'
import prisma from './prisma'
import { genSaltSync, hashSync } from 'bcrypt-ts'
import { withTryCatch } from './utils'

type CreateUser = {
  name: string
  email: string
  password: string
}

export function createUser({ name, email, password }: CreateUser) {
  return withTryCatch(() => {
    const salt = genSaltSync(10)
    const hashedPassword = hashSync(password, salt)

    return prisma.recruiter.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    })
  })
}

export function getUser(email: string) {
  return withTryCatch(() => {
    return prisma.recruiter.findUnique({ where: { email } })
  })
}
