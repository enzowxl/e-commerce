'use server'

import { Product } from '@prisma/client'

import { api } from '@/utils/api'

type GetProductTypes = { type: 'ALL' | 'OFFER' }
type GetProductTypeQuery = { type: 'QUERY'; query: string }
type GetProductTypeCategory = { type: 'CATEGORY'; categorySlug: string }

type AllTypes = GetProductTypes | GetProductTypeQuery | GetProductTypeCategory

export async function getProducts(options: AllTypes): Promise<Product[]> {
  let url: string = ''

  switch (options.type) {
    case 'ALL':
      url = '/product?type=all'
      break
    case 'OFFER':
      url = '/product?type=offer'
      break
    case 'QUERY':
      url = `/product?type=query&q=${options.query}`
      break
    case 'CATEGORY':
      url = `/product?type=category&category=${options.categorySlug}`
      break

    default:
      url = '/product?type=all'
      break
  }

  const response = await api(url, {
    method: 'GET',
    cache: 'no-cache',
  })

  const { products } = (await response.json()) as { products: Product[] }

  return products
}
