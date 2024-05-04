import { PrismaProductsRepository } from '../../_repository/prisma/prisma-products-repository'
import { FetchProductUseCase } from '../fetch-product'

export function makeFetchProductUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const fetchProductUseCase = new FetchProductUseCase(productsRepository)

  return fetchProductUseCase
}
