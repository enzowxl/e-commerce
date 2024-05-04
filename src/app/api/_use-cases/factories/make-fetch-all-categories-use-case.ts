import { PrismaCategoriesRepository } from '../../_repository/prisma/prisma-categories-repository'
import { FetchAllCategoriesUseCase } from '../fetch-all-categories'

export function makeFetchAllCategoriesUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository()
  const fetchAllCategoriesUseCase = new FetchAllCategoriesUseCase(
    categoriesRepository,
  )

  return fetchAllCategoriesUseCase
}
