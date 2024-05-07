import { randomUUID } from 'node:crypto'

import { Cart, CartItem, Prisma } from '@prisma/client'

import { CartItemsRepository, CartsRepository } from '../carts-repository'

export class InMemoryCartItemsRepository implements CartItemsRepository {
  public cartItems: CartItem[] = []

  async create(data: Prisma.CartItemUncheckedCreateInput) {
    const createCartItem: CartItem = {
      id: randomUUID(),
      productSlug: data.productSlug,
      cartId: data.cartId,
      quantity: data.quantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.cartItems.push(createCartItem)

    return createCartItem
  }

  async update(id: string, data: Prisma.CartItemUpdateInput) {
    const findCartItemIndex = this.cartItems.findIndex((cart) => cart.id === id)

    if (findCartItemIndex === -1) return null

    const updatedCartItem = { ...this.cartItems[findCartItemIndex] }

    Object.assign(updatedCartItem, data)

    updatedCartItem.updatedAt = new Date()

    this.cartItems[findCartItemIndex] = updatedCartItem

    return updatedCartItem
  }

  async findWithProductSlugAndCartId(productSlug: string, cartId: string) {
    const findCart = this.cartItems.find(
      (cart) => cart.productSlug === productSlug && cart.cartId === cartId,
    )

    if (!findCart) return null

    return findCart
  }
}

export class InMemoryCartsRepository implements CartsRepository {
  public carts: Cart[] = []

  async create(data: Prisma.CartUncheckedCreateInput) {
    const createCart: Cart = {
      id: randomUUID(),
      sessionId: data.sessionId,
      userId: data.userId as string,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.carts.push(createCart)

    return createCart
  }

  async update(sessionId: string, data: Prisma.CartItemUpdateInput) {
    const findCartIndex = this.carts.findIndex(
      (cart) => cart.sessionId === sessionId,
    )

    if (findCartIndex === -1) return null

    const updatedCart = { ...this.carts[findCartIndex] }

    Object.assign(updatedCart, data)

    updatedCart.updatedAt = new Date()

    this.carts[findCartIndex] = updatedCart

    return updatedCart
  }

  async findBySessionId(sessionId: string) {
    const findCart = this.carts.find((cart) => cart.sessionId === sessionId)

    if (!findCart) return null

    return findCart
  }
}
