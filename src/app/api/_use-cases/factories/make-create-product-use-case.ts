import { PrismaCategoriesRepository } from '../../_repository/prisma/prisma-categories-repository'
import { PrismaProductsRepository } from '../../_repository/prisma/prisma-products-repository'
import { CreateProductUseCase } from '../create-product'

export function makeCreateProductUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const categoriesRepository = new PrismaCategoriesRepository()
  const createProductUseCase = new CreateProductUseCase(
    productsRepository,
    categoriesRepository,
  )

  return createProductUseCase
}
