import { NextResponse } from 'next/server'

export class ProductAlreadyExistsError extends Error {
  constructor() {
    super('Product already exists')
  }

  error() {
    return NextResponse.json(
      { error: 'Product already exists' },
      { status: 400 },
    )
  }
}
