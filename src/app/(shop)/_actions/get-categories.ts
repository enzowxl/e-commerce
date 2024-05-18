'use server'

import { Category } from '@prisma/client'

import { api } from '@/utils/api'

export async function getCategories(): Promise<Category[]> {
  const response = await api('/category', {
    method: 'GET',
    cache: 'no-cache',
  })

  const { categories } = (await response.json()) as { categories: Category[] }

  return categories
}
