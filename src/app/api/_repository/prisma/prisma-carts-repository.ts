import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { CartItemsRepository, CartsRepository } from '../carts-repository'

export class PrismaCartItemsRepository implements CartItemsRepository {
  async create(data: Prisma.CartItemUncheckedCreateInput) {
    return await prisma.cartItem.create({
      data,
    })
  }

  async update(id: string, data: Prisma.CartItemUpdateInput) {
    return await prisma.cartItem.update({
      where: {
        id,
      },
      data,
    })
  }

  async findWithProductSlugAndCartId(productSlug: string, cartId: string) {
    return await prisma.cartItem.findFirst({
      where: {
        productSlug,
        cartId,
      },
    })
  }
}

export class PrismaCartsRepository implements CartsRepository {
  async update(sessionId: string, data: Prisma.CartUncheckedUpdateInput) {
    return await prisma.cart.update({
      where: {
        sessionId,
      },
      data,
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    })
  }

  async create(data: Prisma.CartUncheckedCreateInput) {
    return await prisma.cart.create({
      data,
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    })
  }

  async findBySessionId(sessionId: string) {
    return await prisma.cart.findUnique({
      where: {
        sessionId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    })
  }
}
