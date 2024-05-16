import { PrismaOrdersRepository } from '../../_repository/prisma/prisma-orders-repository'
import { CreateOrderUseCase } from '../create-order'

export function makeCreateOrderUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const createOrderUseCase = new CreateOrderUseCase(ordersRepository)

  return createOrderUseCase
}
