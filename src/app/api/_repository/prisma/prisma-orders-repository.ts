import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { OrdersRepository } from '../orders-repository'

export class PrismaOrdersRepository implements OrdersRepository {
  async create(data: Prisma.OrderUncheckedCreateInput) {
    return await prisma.order.create({
      data,
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    })
  }

  async findManyByUserId(id: string) {
    return await prisma.order.findMany({
      where: { userId: id },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    })
  }
}
