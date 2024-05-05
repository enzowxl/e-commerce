import { randomUUID } from 'node:crypto'

import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCartsRepository } from '../_repository/in-memory/in-memory-carts-repository'
import { FetchCartUseCase } from './fetch-cart'

let cartsRepository: InMemoryCartsRepository
let sut: FetchCartUseCase

describe('Fetching cart Use Case', () => {
  beforeEach(() => {
    cartsRepository = new InMemoryCartsRepository()
    sut = new FetchCartUseCase(cartsRepository)
  })

  it('should be able to fetching a cart', async () => {
    const sessionId = randomUUID()

    await cartsRepository.create({
      sessionId,
    })

    const { cart } = await sut.execute({
      sessionId,
    })

    expect(cart?.id).toEqual(expect.any(String))
  })
})
