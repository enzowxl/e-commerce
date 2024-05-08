import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z, ZodError } from 'zod'

import { AuthenticateUserError } from '@/app/api/_errors/authenticate-user-error'
import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { makeAuthenticateUseCase } from '@/app/api/_use-cases/factories/make-authenticate'

export const authOptions = {
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

          const authenticateUseCase = makeAuthenticateUseCase()

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
  callbacks: {
    async jwt({ token }) {
      return {
        ...token,
      }
    },
    async session({ session, token }) {
      session.user.sub = token.sub as string
      return {
        ...session,
      }
    },
  },
  pages: {
    error: '/',
    signIn: '/signin',
    signOut: '/',
  },
} as NextAuthOptions
