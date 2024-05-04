import { Prisma } from '@prisma/client'

import { ProductNotExistsError } from '../_errors/product-not-exists-error'
import { UserNotExistsError } from '../_errors/user-not-exists-error'
import {
  CartItemRepository,
  ShoppingCartRepository,
} from '../_repository/carts-repository'
import { ProductsRepository } from '../_repository/products-repository'
import { UsersRepository } from '../_repository/users-repository'

interface CreateCartUseCaseRequest
  extends Prisma.ShoppingCartUncheckedCreateInput {
  slug: string
}

export class CreateCartUseCase {
  constructor(
    private cartitemRepository: CartItemRepository,
    private shoppingcartRepository: ShoppingCartRepository,
    private productsRepository: ProductsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    sessionId,
    slug,
    userId = undefined,
  }: CreateCartUseCaseRequest) {
    const productWithSlug = await this.productsRepository.findBySlug(slug)

    if (!productWithSlug) throw new ProductNotExistsError()

    if (userId) {
      const userWithId = await this.usersRepository.findById(userId)
      if (!userWithId) throw new UserNotExistsError()
    }

    let shoppingCart =
      await this.shoppingcartRepository.findBySessionId(sessionId)

    if (!shoppingCart) {
      shoppingCart = await this.shoppingcartRepository.create({
        sessionId,
        userId,
      })
    }

    if (!shoppingCart.userId && userId) {
      shoppingCart = await this.shoppingcartRepository.update(sessionId, {
        userId,
      })
    }

    let cartWithProductSlugAndShoppingCartId =
      await this.cartitemRepository.findWithProductSlugAndShoppingCartId(
        productWithSlug.id,
        shoppingCart?.id as string,
      )

    if (cartWithProductSlugAndShoppingCartId) {
      cartWithProductSlugAndShoppingCartId =
        await this.cartitemRepository.update(
          cartWithProductSlugAndShoppingCartId.id,
          {
            quantity: { increment: 1 },
          },
        )
    } else {
      cartWithProductSlugAndShoppingCartId =
        await this.cartitemRepository.create({
          quantity: 1,
          shoppingCartId: shoppingCart?.id as string,
          productSlug: productWithSlug.slug,
        })
    }

    return {
      shoppingCart,
      cartItem: cartWithProductSlugAndShoppingCartId,
    }
  }
}
