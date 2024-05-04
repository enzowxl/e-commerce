import { PrismaCategoriesRepository } from '../../_repository/prisma/prisma-categories-repository'
import { FetchCategoryUseCase } from '../fetch-category'

export function makeFetchCategoryUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository()
  const fetchCategoryUseCase = new FetchCategoryUseCase(categoriesRepository)

  return fetchCategoryUseCase
}
