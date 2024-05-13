import { Product } from '@prisma/client'
import { redirect } from 'next/navigation'

import { api } from '@/utils/api'

export async function getProduct(slug: string): Promise<Product | null> {
  const response = await api(`/product/${slug}`, {
    method: 'GET',
    cache: 'no-cache',
  })

  const { product } = (await response.json()) as { product: Product }

  if (product === undefined) {
    return redirect('/')
  }

  return product
}
