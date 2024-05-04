import { PrismaCategoriesRepository } from '../../_repository/prisma/prisma-categories-repository'
import { DeleteCategoryUseCase } from '../delete-category'

export function makeDeleteCategoryUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository()
  const deleteCategoryUseCase = new DeleteCategoryUseCase(categoriesRepository)

  return deleteCategoryUseCase
}
