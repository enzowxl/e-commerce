import { Prisma } from '@prisma/client'

import { ProductNotExistsError } from '../_errors/product-not-exists-error'
import { UserNotExistsError } from '../_errors/user-not-exists-error'
import {
  CartItemsRepository,
  CartsRepository,
} from '../_repository/carts-repository'
import { ProductsRepository } from '../_repository/products-repository'
import { UsersRepository } from '../_repository/users-repository'

interface CreateCartUseCaseRequest extends Prisma.CartUncheckedCreateInput {
  slug: string
}

export class CreateCartUseCase {
  constructor(
    private cartItemsRepository: CartItemsRepository,
    private cartsRepository: CartsRepository,
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

    let cart = await this.cartsRepository.findBySessionId(sessionId)

    if (!cart) {
      cart = await this.cartsRepository.create({
        sessionId,
        userId,
      })
    }

    if (!cart.userId && userId) {
      cart = await this.cartsRepository.update(sessionId, {
        userId,
      })
      cart = await this.cartsRepository.findBySessionId(sessionId)
    }

    let cartWithProductSlugAndCartId =
      await this.cartItemsRepository.findWithProductSlugAndCartId(
        productWithSlug.slug,
        cart?.id as string,
      )

    if (cartWithProductSlugAndCartId) {
      cartWithProductSlugAndCartId = await this.cartItemsRepository.update(
        cartWithProductSlugAndCartId.id,
        {
          quantity: { increment: 1 },
        },
      )
    } else {
      cartWithProductSlugAndCartId = await this.cartItemsRepository.create({
        quantity: 1,
        cartId: cart?.id as string,
        productSlug: productWithSlug.slug,
      })
    }

    return {
      cart,
      cartItem: cartWithProductSlugAndCartId,
    }
  }
}
