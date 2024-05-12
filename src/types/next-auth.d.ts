import { UserRoles } from '@prisma/client'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      sub: string
      role: UserRoles
    } & DefaultSession['user']
  }
}
