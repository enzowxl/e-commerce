import { Prisma } from '@prisma/client'

import { api } from '../../../utils/api'
import { createSlug } from '../../../utils/create-slug'
import { ProductNotExistsError } from '../_errors/product-not-exists-error'
import { ProductsRepository } from '../_repository/products-repository'
interface UpdateProductUseCaseRequest {
  data: Prisma.ProductUncheckedUpdateInput
  slug: string
  photo?: File | undefined
}

export class UpdateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}
  async execute({ slug, photo, data }: UpdateProductUseCaseRequest) {
    const productWithSlug = await this.productsRepository.findBySlug(slug)

    if (!productWithSlug) throw new ProductNotExistsError()

    if (data?.name) {
      data.slug = createSlug(data.name as string)
    }

    if (photo) {
      if (productWithSlug.photoId) {
        await api(`/utils/image/delete/${productWithSlug.photoId}`, {
          method: 'DELETE',
        })
      }

      const formData = new FormData()

      formData.append('photo', photo)

      const response = await api('/utils/image/upload', {
        method: 'POST',
        body: formData,
      })

      const results = await response.json()

      data.photoUrl = results.url
      data.photoId = results.public_id
    }

    const updateProduct = await this.productsRepository.update(slug, data)

    return { product: updateProduct }
  }
}
