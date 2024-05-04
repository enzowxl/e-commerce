import { randomUUID } from 'node:crypto'

import { cookies } from 'next/headers'

export function getSessionId(): string {
  const cookieStore = cookies()
  let sessionId = cookieStore.get('sessionId')?.value

  if (!sessionId) {
    cookieStore.set('sessionId', randomUUID(), {
      path: '/',
    })

    sessionId = cookieStore.get('sessionId')?.value
  }

  return sessionId as string
}
