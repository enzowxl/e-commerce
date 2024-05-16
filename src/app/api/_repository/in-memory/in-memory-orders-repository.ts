import { randomUUID } from 'node:crypto'

import { Order, Prisma } from '@prisma/client'

import { OrderPayload, OrdersRepository } from '../orders-repository'

export class InMemoryOrdersRepository implements OrdersRepository {
  public orders: Order[] = []

  async create(data: Prisma.OrderUncheckedCreateInput): Promise<Order> {
    const createOrder: Order = {
      id: randomUUID(),
      status: data.status ?? 'WAITING_FOR_PAYMENT',
      subtotalPrice: new Prisma.Decimal(data.subtotalPrice.toString()),
      totalPrice: new Prisma.Decimal(data.totalPrice.toString()),
      totalDiscounts: new Prisma.Decimal(data.totalDiscounts.toString()),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: data.userId,
    }

    this.orders.push(createOrder)

    return createOrder
  }

  async findManyByUserId(id: string): Promise<OrderPayload[]> {
    const findOrdersByUserId = this.orders.filter(
      (order) => order.userId === id,
    ) as unknown as OrderPayload[]

    return findOrdersByUserId
  }
}
