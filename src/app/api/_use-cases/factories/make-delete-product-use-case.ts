import { PrismaProductsRepository } from '../../_repository/prisma/prisma-products-repository'
import { DeleteProductUseCase } from '../delete-product'

export function makeDeleteProductUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const deleteProductUseCase = new DeleteProductUseCase(productsRepository)

  return deleteProductUseCase
}
