import { NextResponse } from 'next/server'

export class ValidationError extends Error {
  constructor() {
    super('Validation error')
  }

  error() {
    return NextResponse.json({ error: 'Validation error' }, { status: 400 })
  }
}
