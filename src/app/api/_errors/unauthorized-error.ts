import { NextResponse } from 'next/server'

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized')
  }

  error() {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 400 })
  }
}
