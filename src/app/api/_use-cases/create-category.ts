import { Prisma } from '@prisma/client'

import { api } from '../../../utils/api'
import { CategoryAlreadyExistsError } from '../_errors/category-already.exists-error'
import { CategoriesRepository } from '../_repository/categories-repository'

interface CreateCategoriesUseCaseRequest extends Prisma.CategoryCreateInput {
  photo?: File | undefined
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}
  async execute({ name, photo, slug }: CreateCategoriesUseCaseRequest) {
    const categoryWithSlug = await this.categoriesRepository.findBySlug(slug)

    if (categoryWithSlug) throw new CategoryAlreadyExistsError()

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

    const createCategory = await this.categoriesRepository.create({
      name,
      photoUrl,
      photoId,
      slug,
    })

    return { category: createCategory }
  }
}
