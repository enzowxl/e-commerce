import { Prisma } from '@prisma/client'

import { api } from '../../../utils/api'
import { CategoryNotExistsError } from '../_errors/category-not-exists-error'
import { ProductAlreadyExistsError } from '../_errors/product-already-exists-error'
import { CategoriesRepository } from '../_repository/categories-repository'
import { ProductsRepository } from '../_repository/products-repository'

interface CreateProductUseCaseRequest
  extends Prisma.ProductUncheckedCreateInput {
  photo?: File | undefined
}

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
    slug,
    categorySlug,
    colors,
    sizes,
    photo,
  }: CreateProductUseCaseRequest) {
    const productWithSlug = await this.productsRepository.findBySlug(slug)

    if (productWithSlug) throw new ProductAlreadyExistsError()

    if (categorySlug) {
      const categoryWithSlug =
        await this.categoriesRepository.findBySlug(categorySlug)
      if (!categoryWithSlug) throw new CategoryNotExistsError()
    }

    let photoUrl: string | undefined
    let photoId: string | undefined

    if (photo) {
      const formData = new FormData()

      formData.append('photo', photo)

      const response = await api('/utils/image/upload', {
        method: 'POST',
        body: formData,
      })

      const results = await response.json()

      photoUrl = results.url
      photoId = results.public_id
    }

    const createProduct = await this.productsRepository.create({
      name,
      price,
      type,
      discount,
      description,
      photoUrl,
      photoId,
      slug,
      categorySlug,
      colors,
      sizes,
    })

    return { product: createProduct }
  }
}
