'use server'

import { Product } from '@prisma/client'

import { api } from '@/utils/api'

export async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/product/${slug}`, {
    method: 'GET',
    cache: 'no-cache',
  })

  const { product } = (await response.json()) as { product: Product }

  return product
}
