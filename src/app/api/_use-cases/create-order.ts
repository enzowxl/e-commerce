import { Prisma } from '@prisma/client'

import { OrdersRepository } from '../_repository/orders-repository'

interface CreateOrderUseCaseRequest extends Prisma.OrderUncheckedCreateInput {}

export class CreateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    userId,
    status,
    subtotalPrice,
    totalPrice,
    totalDiscounts,
    orderItems,
  }: CreateOrderUseCaseRequest) {
    const createOrder = await this.ordersRepository.create({
      userId,
      status,
      subtotalPrice,
      totalPrice,
      totalDiscounts,
      orderItems,
    })

    return { order: createOrder }
  }
}
