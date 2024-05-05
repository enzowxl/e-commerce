import {
  PrismaCartItemsRepository,
  PrismaCartsRepository,
} from '../../_repository/prisma/prisma-carts-repository'
import { PrismaProductsRepository } from '../../_repository/prisma/prisma-products-repository'
import { PrismaUsersRepository } from '../../_repository/prisma/prisma-users-repository'
import { CreateCartUseCase } from '../create-cart'

export function makeCreateCartUseCase() {
  const cartItemsRepository = new PrismaCartItemsRepository()
  const cartsRepository = new PrismaCartsRepository()
  const productsRepository = new PrismaProductsRepository()
  const usersRepository = new PrismaUsersRepository()
  const createCartUseCase = new CreateCartUseCase(
    cartItemsRepository,
    cartsRepository,
    productsRepository,
    usersRepository,
  )

  return createCartUseCase
}
