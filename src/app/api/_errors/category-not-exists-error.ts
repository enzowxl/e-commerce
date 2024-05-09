import { NextResponse } from 'next/server'

export class CategoryNotExistsError extends Error {
  constructor() {
    super('Category not exists')
  }

  error() {
    return NextResponse.json({ error: 'Category not exists' }, { status: 400 })
  }
}
