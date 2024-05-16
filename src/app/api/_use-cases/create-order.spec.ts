import { randomUUID } from 'node:crypto'

import { beforeEach, describe, expect, it } from 'vitest'

import { createSlug } from '../../../utils/create-slug'
import { InMemoryOrdersRepository } from '../_repository/in-memory/in-memory-orders-repository'
import { InMemoryProductsRepository } from '../_repository/in-memory/in-memory-products-repository'
import { CreateOrderUseCase } from './create-order'

let ordersRepository: InMemoryOrdersRepository
let productsRepository: InMemoryProductsRepository
let sut: CreateOrderUseCase
describe('Create product Use Case', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    productsRepository = new InMemoryProductsRepository()
    sut = new CreateOrderUseCase(ordersRepository)
  })

  it('should be able to create a order', async () => {
    Array.from({ length: 5 }, async () => {
      return await productsRepository.create({
        name: 'Black shirt',
        price: 30,
        description: 'This is a shirt',
        slug: createSlug('Black shirt'),
        categorySlug: 'slug',
      })
    })
    const { order } = await sut.execute({
      userId: randomUUID(),
      status: 'WAITING_FOR_PAYMENT',
      subtotalPrice: 200,
      totalPrice: 200,
      totalDiscounts: 200,
      orderItems: {
        createMany: {
          data: productsRepository.products.map((product) => {
            return {
              price: product.price,
              discount: product.discount,
              quantity: 1,
              productId: product.id,
            }
          }),
        },
      },
    })

    expect(order.id).toEqual(expect.any(String))
  })
})
