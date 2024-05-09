import { NextResponse } from 'next/server'

export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User already exists')
  }

  error() {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  }
}
