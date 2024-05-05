import { PrismaCartsRepository } from '../../_repository/prisma/prisma-carts-repository'
import { FetchCartUseCase } from '../fetch-cart'

export function makeFetchCartUseCase() {
  const cartsRepository = new PrismaCartsRepository()
  const fetchShoppingCartUseCase = new FetchCartUseCase(cartsRepository)

  return fetchShoppingCartUseCase
}
