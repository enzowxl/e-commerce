import { Product } from '@prisma/client'

import { api } from '@/utils/api'

export async function getProducts(): Promise<Product[]> {
  const response = await api('/product', {
    method: 'GET',
    cache: 'no-cache',
  })

  const { products } = (await response.json()) as { products: Product[] }

  return products
}
