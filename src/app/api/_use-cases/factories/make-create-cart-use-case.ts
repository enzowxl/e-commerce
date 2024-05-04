import {
  PrismaCartItemRepository,
  PrismaShoppingCartRepository,
} from '../../_repository/prisma/prisma-carts-repository'
import { PrismaProductsRepository } from '../../_repository/prisma/prisma-products-repository'
import { PrismaUserRepository } from '../../_repository/prisma/prisma-users-repository'
import { CreateCartUseCase } from '../create-cart'

export function makeCreateCartUseCase() {
  const cartitemRepository = new PrismaCartItemRepository()
  const shoppingCartRepository = new PrismaShoppingCartRepository()
  const productsRepository = new PrismaProductsRepository()
  const usersRepository = new PrismaUserRepository()
  const createCartUseCase = new CreateCartUseCase(
    cartitemRepository,
    shoppingCartRepository,
    productsRepository,
    usersRepository,
  )

  return createCartUseCase
}
