import { PrismaCategoriesRepository } from '../../_repository/prisma/prisma-categories-repository'
import { UpdateCategoryUseCase } from '../update-category'

export function makeUpdateCategoryUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository()
  const updateCategory = new UpdateCategoryUseCase(categoriesRepository)

  return updateCategory
}
