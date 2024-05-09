import { NextResponse } from 'next/server'

export class AuthenticateUserError extends Error {
  constructor() {
    super('Email/Password not valid')
  }

  error() {
    return NextResponse.json(
      { error: 'Email/Password not valid' },
      { status: 400 },
    )
  }
}
