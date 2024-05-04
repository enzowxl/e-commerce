import { Prisma } from '@prisma/client'

import { CategoryNotExistsError } from '../_errors/category-not-exists-error'
import { ProductAlreadyExistsError } from '../_errors/product-already-exists-error'
import { CategoriesRepository } from '../_repository/categories-repository'
import { ProductsRepository } from '../_repository/products-repository'

interface CreateProductUseCaseRequest
  extends Prisma.ProductUncheckedCreateInput {}

export class CreateProductUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute({
    name,
    price,
    type,
    discount,
    description,
    avatarUrl,
    slug,
    categorySlug,
    colors,
    photos,
    sizes,
  }: CreateProductUseCaseRequest) {
    const productWithSlug = await this.productsRepository.findBySlug(slug)
    const categoryWithSlug =
      await this.categoriesRepository.findBySlug(categorySlug)

    if (productWithSlug) throw new ProductAlreadyExistsError()

    if (!categoryWithSlug) throw new CategoryNotExistsError()

    const createProduct = await this.productsRepository.create({
      name,
      price,
      type,
      discount,
      description,
      avatarUrl,
      slug,
      categorySlug,
      colors,
      photos,
      sizes,
    })

    return { product: createProduct }
  }
}
