import { NextResponse } from 'next/server'

export class UserNotExistsError extends Error {
  constructor() {
    super('User not exists')
  }

  error() {
    return NextResponse.json({ error: 'User not exists' }, { status: 400 })
  }
}
