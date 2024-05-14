import { Product } from '@prisma/client'

import { ProductsRepository } from '../_repository/products-repository'

type GetProductTypes = { type: 'ALL' | 'OFFER' }
type GetProductTypeQuery = { type: 'QUERY'; query: string }
type GetProductTypeCategory = { type: 'CATEGORY'; categorySlug: string }

type AllTypes = GetProductTypes | GetProductTypeQuery | GetProductTypeCategory

export class FetchAllProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}
  async execute(options: AllTypes) {
    let products: Product[] = []

    switch (options.type) {
      case 'ALL':
        products = await this.productsRepository.findMany()
        break
      case 'OFFER':
        products = await this.productsRepository.findByOffer()
        break
      case 'CATEGORY':
        products = await this.productsRepository.findByCategorySlug(
          options.categorySlug,
        )
        break
      case 'QUERY':
        products = await this.productsRepository.findByQuery(options.query)
        break
      default:
        products = await this.productsRepository.findMany()
        break
    }

    return { products }
  }
}
