import { PrismaCategoriesRepository } from '../../_repository/prisma/prisma-categories-repository'
import { PrismaProductsRepository } from '../../_repository/prisma/prisma-products-repository'
import { FetchAllProductsUseCase } from '../fetch-all-products'

export function makeFetchAllProductsUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const categoriesRepository = new PrismaCategoriesRepository()
  const fetchAllProductsUseCase = new FetchAllProductsUseCase(
    productsRepository,
    categoriesRepository,
  )

  return fetchAllProductsUseCase
}
