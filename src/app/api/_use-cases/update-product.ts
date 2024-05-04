import { Prisma } from '@prisma/client'

import { ProductNotExistsError } from '../_errors/product-not-exists-error'
import { ProductsRepository } from '../_repository/products-repository'

interface UpdateProductUseCaseRequest {
  data: Prisma.ProductUpdateInput
  slug: string
}

function createSlug(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()
}

export class UpdateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}
  async execute({ slug, data }: UpdateProductUseCaseRequest) {
    const productFromSlug = await this.productsRepository.findBySlug(slug)

    if (!productFromSlug) throw new ProductNotExistsError()

    if (data?.name) {
      data.slug = createSlug(data.name as string)
    }

    const updateProduct = await this.productsRepository.update(slug, data)

    return { product: updateProduct }
  }
}
