import { Order, Prisma } from '@prisma/client'

export interface OrderPayload
  extends Prisma.OrderGetPayload<{
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    }
  }> {}

export interface OrdersRepository {
  create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>
  findManyByUserId(id: string): Promise<OrderPayload[]>
}
