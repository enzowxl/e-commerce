'use server'

import { User } from '@prisma/client'
import { headers } from 'next/headers'

import { api } from '@/utils/api'

export async function getUsers(): Promise<User[]> {
  const Cookie = String(headers().get('Cookie'))

  const response = await api('/auth/users', {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      Cookie,
    },
  })

  const { users } = (await response.json()) as { users: User[] }

  return users
}
