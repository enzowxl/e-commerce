import { PrismaProductsRepository } from '../../_repository/prisma/prisma-products-repository'
import { FetchAllProductsUseCase } from '../fetch-all-products'

export function makeFetchAllProductsUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const fetchAllProductsUseCase = new FetchAllProductsUseCase(
    productsRepository,
  )

  return fetchAllProductsUseCase
}
