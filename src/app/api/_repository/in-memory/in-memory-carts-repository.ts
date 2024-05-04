import { randomUUID } from 'node:crypto'

import { CartItem, Prisma, ShoppingCart } from '@prisma/client'

import { CartItemRepository, ShoppingCartRepository } from '../carts-repository'

export class InMemoryCartItemRepository implements CartItemRepository {
  public cartItem: CartItem[] = []

  async create(data: Prisma.CartItemUncheckedCreateInput) {
    const createCartItem: CartItem = {
      id: randomUUID(),
      productSlug: data.productSlug,
      shoppingCartId: data.shoppingCartId,
      quantity: data.quantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.cartItem.push(createCartItem)

    return createCartItem
  }

  async update(id: string, data: Prisma.CartItemUpdateInput) {
    const findCartItemIndex = this.cartItem.findIndex((cart) => cart.id === id)

    if (findCartItemIndex === -1) return null

    const updatedCartItem = { ...this.cartItem[findCartItemIndex] }

    Object.assign(updatedCartItem, data)

    updatedCartItem.updatedAt = new Date()

    this.cartItem[findCartItemIndex] = updatedCartItem

    return updatedCartItem
  }

  async findWithProductSlugAndShoppingCartId(
    productSlug: string,
    shoppingCartId: string,
  ) {
    const findCart = this.cartItem.find(
      (cart) =>
        cart.productSlug === productSlug &&
        cart.shoppingCartId === shoppingCartId,
    )

    if (!findCart) return null

    return findCart
  }
}

export class InMemoryShoppingCartRepository implements ShoppingCartRepository {
  public shoppingCart: ShoppingCart[] = []

  async create(data: Prisma.ShoppingCartCreateInput) {
    const createShoppingCart: ShoppingCart = {
      id: randomUUID(),
      sessionId: data.sessionId,
      userId: data.user?.connect?.id as string,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.shoppingCart.push(createShoppingCart)

    return createShoppingCart
  }

  async update(sessionId: string, data: Prisma.CartItemUpdateInput) {
    const findShoppingCartIndex = this.shoppingCart.findIndex(
      (shopping) => shopping.sessionId === sessionId,
    )

    if (findShoppingCartIndex === -1) return null

    const updatedShoppingCart = { ...this.shoppingCart[findShoppingCartIndex] }

    Object.assign(updatedShoppingCart, data)

    updatedShoppingCart.updatedAt = new Date()

    this.shoppingCart[findShoppingCartIndex] = updatedShoppingCart

    return updatedShoppingCart
  }

  async findBySessionId(sessionId: string) {
    const findShoppingCart = this.shoppingCart.find(
      (shopping) => shopping.sessionId === sessionId,
    )

    if (!findShoppingCart) return null

    return findShoppingCart
  }
}
