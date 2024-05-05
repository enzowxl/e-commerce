import { Cart, CartItem, Prisma } from '@prisma/client'

export interface CartItemsRepository {
  create(data: Prisma.CartItemUncheckedCreateInput): Promise<CartItem>
  update(id: string, data: Prisma.CartItemUpdateInput): Promise<CartItem | null>
  findWithProductSlugAndCartId(
    productSlug: string,
    cartId: string,
  ): Promise<CartItem | null>
}

export interface CartsRepository {
  create(data: Prisma.CartUncheckedCreateInput): Promise<Cart>
  update(
    sessionId: string,
    data: Prisma.CartUncheckedUpdateInput,
  ): Promise<Cart | null>
  findBySessionId(sessionId: string): Promise<Cart | null>
}
