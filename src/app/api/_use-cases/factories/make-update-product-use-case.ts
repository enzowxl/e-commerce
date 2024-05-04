import { PrismaProductsRepository } from '../../_repository/prisma/prisma-products-repository'
import { UpdateProductUseCase } from '../update-product'

export function makeUpdateProductUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const updateProduct = new UpdateProductUseCase(productsRepository)

  return updateProduct
}
