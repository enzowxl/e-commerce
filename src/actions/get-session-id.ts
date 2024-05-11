'use server'

import { randomUUID } from 'node:crypto'

import { cookies } from 'next/headers'

export async function getSessionId(): Promise<string> {
  const cookieStore = cookies()
  let sessionId = cookieStore.get('sessionId')?.value

  if (!sessionId) {
    cookieStore.set('sessionId', randomUUID(), {
      path: '/',
      httpOnly: true,
    })

    sessionId = cookieStore.get('sessionId')?.value
  }

  return sessionId as string
}
