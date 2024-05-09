import { NextResponse } from 'next/server'

export class CategoryAlreadyExistsError extends Error {
  constructor() {
    super('Category already exists')
  }

  error() {
    return NextResponse.json(
      { error: 'Category already exists' },
      { status: 400 },
    )
  }
}
