import { Prisma } from '@prisma/client'

import { CategoryNotExistsError } from '../_errors/category-not-exists-error'
import { CategoriesRepository } from '../_repository/categories-repository'

interface UpdateCategoryUseCaseRequest {
  data: Prisma.CategoryUpdateInput
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

export class UpdateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}
  async execute({ slug, data }: UpdateCategoryUseCaseRequest) {
    const categoryFromSlug = await this.categoriesRepository.findBySlug(slug)

    if (!categoryFromSlug) throw new CategoryNotExistsError()

    if (data?.name) {
      data.slug = createSlug(data.name as string)
    }

    const updateCategory = await this.categoriesRepository.update(slug, data)

    return { category: updateCategory }
  }
}
