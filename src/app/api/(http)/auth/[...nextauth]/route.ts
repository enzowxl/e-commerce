import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z, ZodError } from 'zod'

import { AuthenticateUserError } from '@/app/api/_errors/authenticate-user-error'
import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { PrismaUserRepository } from '@/app/api/_repository/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/app/api/_use-cases/authenticate'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const authSchema = z
            .object({
              email: z.string().email(),
              password: z.string(),
            })
            .parseAsync(credentials)

          const { email, password } = await authSchema

          const usersRepository = new PrismaUserRepository()
          const authenticateUseCase = new AuthenticateUseCase(usersRepository)

          const { user } = await authenticateUseCase.execute({
            email,
            password,
          })

          return user
        } catch (err) {
          if (err instanceof ZodError) {
            throw new ValidationError()
          }
          if (err instanceof AuthenticateUserError) {
            throw new AuthenticateUserError()
          }
          throw new BadRequestError()
        }
      },
    }),
  ],
})

export { handler as GET, handler as POST }
