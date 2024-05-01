import { Prisma } from '@prisma/client'

import { ProductAlreadyExistsError } from '../_errors/product-already-exists-error'
import { ProductsRepository } from '../_repository/products-repository'

interface CreateProductUseCaseRequest extends Prisma.ProductCreateInput {}

export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}
  async execute({
    name,
    price,
    type,
    discount,
    description,
    avatarUrl,
    slug,
  }: CreateProductUseCaseRequest) {
    const productWithSlug = await this.productsRepository.findBySlug(slug)

    if (productWithSlug) throw new ProductAlreadyExistsError()

    const createProduct = await this.productsRepository.create({
      name,
      price,
      type,
      discount,
      description,
      avatarUrl,
      slug,
    })

    return { product: createProduct }
  }
}
