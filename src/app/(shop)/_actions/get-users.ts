'use server'

import { User } from '@prisma/client'

import { api } from '@/utils/api'

export async function getUsers(): Promise<User[]> {
  const response = await api('/auth/users', {
    method: 'GET',
    cache: 'no-cache',
  })

  const { users } = (await response.json()) as { users: User[] }

  return users
}
