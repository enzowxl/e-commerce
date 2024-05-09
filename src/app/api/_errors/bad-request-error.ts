import { NextResponse } from 'next/server'

export class BadRequestError extends Error {
  constructor() {
    super('Oops! an error occurred')
  }

  error() {
    return NextResponse.json(
      { error: 'Oops! an error occurred' },
      { status: 400 },
    )
  }
}
