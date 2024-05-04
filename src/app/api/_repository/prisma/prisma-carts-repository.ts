import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { CartItemRepository, ShoppingCartRepository } from '../carts-repository'

export class PrismaCartItemRepository implements CartItemRepository {
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

  async findWithProductSlugAndShoppingCartId(
    productSlug: string,
    shoppingCartId: string,
  ) {
    return await prisma.cartItem.findFirst({
      where: {
        productSlug,
        shoppingCartId,
      },
    })
  }
}

export class PrismaShoppingCartRepository implements ShoppingCartRepository {
  async update(
    sessionId: string,
    data: Prisma.ShoppingCartUncheckedUpdateInput,
  ) {
    return await prisma.shoppingCart.update({
      where: {
        sessionId,
      },
      data,
    })
  }

  async create(data: Prisma.ShoppingCartUncheckedCreateInput) {
    return await prisma.shoppingCart.create({
      data,
    })
  }

  async findBySessionId(sessionId: string) {
    return await prisma.shoppingCart.findUnique({
      where: {
        sessionId,
      },
    })
  }
}
