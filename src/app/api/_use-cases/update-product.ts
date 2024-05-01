import { Prisma } from '@prisma/client'

import { ProductNotExistsError } from '../_errors/product-not-exists-error'
import { ProductsRepository } from '../_repository/products-repository'

interface UpdateProductUseCaseRequest {
  data: Prisma.ProductUpdateInput
  slug: string
}

export class UpdateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}
  async execute({ slug, data }: UpdateProductUseCaseRequest) {
    const productFromSlug = await this.productsRepository.findBySlug(slug)

    if (!productFromSlug) throw new ProductNotExistsError()

    const updateProduct = await this.productsRepository.update(slug, data)

    return { product: updateProduct }
  }
}
