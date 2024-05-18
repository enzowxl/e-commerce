'use server'

import { Prisma } from '@prisma/client'

import { api } from '@/utils/api'

interface UserPayload
  extends Prisma.UserGetPayload<{
    include: {
      address: true
    }
  }> {}

export async function getMe(email: string): Promise<UserPayload> {
  const response = await api(`/auth/users/${email}`, {
    method: 'GET',
    cache: 'no-cache',
  })

  const { user } = (await response.json()) as { user: UserPayload }

  return user
}
