import { NextResponse } from 'next/server'

export class ProductNotExistsError extends Error {
  constructor() {
    super('Product not exists')
  }

  error() {
    return NextResponse.json({ error: 'Product not exists' }, { status: 400 })
  }
}
