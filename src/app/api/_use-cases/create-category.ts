import { Prisma } from '@prisma/client'

import { CategoryAlreadyExistsError } from '../_errors/category-already.exists-error'
import { CategoriesRepository } from '../_repository/categories-repository'

interface CreateCategoriesUseCaseRequest extends Prisma.CategoryCreateInput {}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}
  async execute({ name, avatarUrl, slug }: CreateCategoriesUseCaseRequest) {
    const categoryWithSlug = await this.categoriesRepository.findBySlug(slug)

    if (categoryWithSlug) throw new CategoryAlreadyExistsError()

    const createCategory = await this.categoriesRepository.create({
      name,
      avatarUrl,
      slug,
    })

    return { category: createCategory }
  }
}
