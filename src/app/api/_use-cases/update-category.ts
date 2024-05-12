import { Prisma } from '@prisma/client'

import { api } from '../../../utils/api'
import { createSlug } from '../../../utils/create-slug'
import { CategoryNotExistsError } from '../_errors/category-not-exists-error'
import { CategoriesRepository } from '../_repository/categories-repository'

interface UpdateCategoryUseCaseRequest {
  data: Prisma.CategoryUpdateInput
  slug: string
  photo?: File | undefined
}

export class UpdateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}
  async execute({ slug, photo, data }: UpdateCategoryUseCaseRequest) {
    const categoryWithSlug = await this.categoriesRepository.findBySlug(slug)

    if (!categoryWithSlug) throw new CategoryNotExistsError()

    if (data?.name) {
      data.slug = createSlug(data.name as string)
    }

    if (photo) {
      if (categoryWithSlug.photoId) {
        await api(`/utils/image/delete/${categoryWithSlug.photoId}`, {
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

    const updateCategory = await this.categoriesRepository.update(slug, data)

    return { category: updateCategory }
  }
}
