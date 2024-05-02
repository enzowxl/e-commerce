import { Prisma } from '@prisma/client'

import { CategoryNotExistsError } from '../_errors/category-not-exists-error'
import { CategoriesRepository } from '../_repository/categories-repository'

interface UpdateCategoryUseCaseRequest {
  data: Prisma.CategoryUpdateInput
  slug: string
}

export class UpdateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}
  async execute({ slug, data }: UpdateCategoryUseCaseRequest) {
    const cateoryFromSlug = await this.categoriesRepository.findBySlug(slug)

    if (!cateoryFromSlug) throw new CategoryNotExistsError()

    const updateCategory = await this.categoriesRepository.update(slug, data)

    return { category: updateCategory }
  }
}
