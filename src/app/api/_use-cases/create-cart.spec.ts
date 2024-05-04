import { randomUUID } from 'node:crypto'

import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { ProductNotExistsError } from '../_errors/product-not-exists-error'
import { UserNotExistsError } from '../_errors/user-not-exists-error'
import {
  InMemoryCartItemRepository,
  InMemoryShoppingCartRepository,
} from '../_repository/in-memory/in-memory-carts-repository'
import { InMemoryProductsRepository } from '../_repository/in-memory/in-memory-products-repository'
import { InMemoryUsersRepository } from '../_repository/in-memory/in-memory-users-repository'
import { CreateCartUseCase } from './create-cart'

let cartitemRepository: InMemoryCartItemRepository
let shoppingCartRepository: InMemoryShoppingCartRepository
let productsRepository: InMemoryProductsRepository
let usersRepository: InMemoryUsersRepository
let sut: CreateCartUseCase

function createSlug(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()
}
describe('Create cart Use Case', () => {
  beforeEach(() => {
    cartitemRepository = new InMemoryCartItemRepository()
    shoppingCartRepository = new InMemoryShoppingCartRepository()
    productsRepository = new InMemoryProductsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateCartUseCase(
      cartitemRepository,
      shoppingCartRepository,
      productsRepository,
      usersRepository,
    )
  })

  it('should be able to create a cart', async () => {
    const sessionId = randomUUID()

    const { slug } = await productsRepository.create({
      name: 'Black shirt',
      price: 30,
      description: 'This is a shirt',
      slug: createSlug('Black shirt'),
      type: 'T_SHIRT',
      categorySlug: 'slug',
    })

    const { cartItem, shoppingCart } = await sut.execute({
      sessionId,
      slug,
    })

    expect(cartItem?.id && shoppingCart?.id).toEqual(expect.any(String))
  })

  it('should be able to cart item linked to shopping cart', async () => {
    const sessionId = randomUUID()

    const { slug } = await productsRepository.create({
      name: 'Black shirt',
      price: 30,
      description: 'This is a shirt',
      slug: createSlug('Black shirt'),
      type: 'T_SHIRT',
      categorySlug: 'slug',
    })

    const { cartItem, shoppingCart } = await sut.execute({
      sessionId,
      slug,
    })

    expect(cartItem?.shoppingCartId).toEqual(shoppingCart?.id)
  })

  it('should be able to cart items have a various items', async () => {
    const sessionId = randomUUID()

    const { slug } = await productsRepository.create({
      name: 'Black shirt',
      price: 30,
      description: 'This is a shirt',
      slug: createSlug('Black shirt'),
      type: 'T_SHIRT',
      categorySlug: 'slug',
    })

    await sut.execute({
      sessionId,
      slug,
    })

    await sut.execute({
      sessionId,
      slug,
    })

    expect(cartitemRepository.cartItem.length).toEqual(2)
  })

  it('should be possible to see that there are more than one product in the cart', async () => {
    const sessionId = randomUUID()

    const { slug } = await productsRepository.create({
      name: 'Black shirt',
      price: 30,
      description: 'This is a shirt',
      slug: createSlug('Black shirt'),
      type: 'T_SHIRT',
      categorySlug: 'slug',
    })

    await sut.execute({
      sessionId,
      slug,
    })

    await sut.execute({
      sessionId,
      slug,
    })

    await sut.execute({
      sessionId,
      slug,
    })

    const countProduct = cartitemRepository.cartItem.reduce(
      (acc, product) => acc + product.quantity,
      0,
    )

    expect(countProduct).toEqual(3)
  })

  it('should not be possible to create a cart for a non-existing product', async () => {
    const sessionId = randomUUID()

    await expect(() =>
      sut.execute({
        sessionId,
        slug: 'black-shirt',
      }),
    ).rejects.toBeInstanceOf(ProductNotExistsError)
  })

  it('should be able to create a cart and update with user id', async () => {
    const sessionId = randomUUID()

    const { slug } = await productsRepository.create({
      name: 'Black shirt',
      price: 30,
      description: 'This is a shirt',
      slug: createSlug('Black shirt'),
      type: 'T_SHIRT',
      categorySlug: 'slug',
    })

    const { id } = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
    })

    await sut.execute({
      sessionId,
      slug,
    })

    const { shoppingCart } = await sut.execute({
      sessionId,
      slug,
      userId: id,
    })

    expect(shoppingCart?.userId).toEqual(expect.any(String))
  })

  it('should be able to create a cart, but user id as invalid', async () => {
    const sessionId = randomUUID()

    const { slug } = await productsRepository.create({
      name: 'Black shirt',
      price: 30,
      description: 'This is a shirt',
      slug: createSlug('Black shirt'),
      type: 'T_SHIRT',
      categorySlug: 'slug',
    })

    await sut.execute({
      sessionId,
      slug,
    })

    await expect(() =>
      sut.execute({
        sessionId,
        slug,
        userId: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(UserNotExistsError)
  })
})
