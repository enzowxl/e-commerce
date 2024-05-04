import { CartItem, Prisma, ShoppingCart } from '@prisma/client'

export interface CartItemRepository {
  create(data: Prisma.CartItemUncheckedCreateInput): Promise<CartItem>
  update(id: string, data: Prisma.CartItemUpdateInput): Promise<CartItem | null>
  findWithProductSlugAndShoppingCartId(
    productSlug: string,
    shoppingCartId: string,
  ): Promise<CartItem | null>
}

export interface ShoppingCartRepository {
  create(data: Prisma.ShoppingCartUncheckedCreateInput): Promise<ShoppingCart>
  update(
    sessionId: string,
    data: Prisma.ShoppingCartUncheckedUpdateInput,
  ): Promise<ShoppingCart | null>
  findBySessionId(sessionId: string): Promise<ShoppingCart | null>
}
