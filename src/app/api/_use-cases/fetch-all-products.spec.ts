import { beforeEach, describe, expect, it } from 'vitest'

import { createSlug } from '../../../utils/create-slug'
import { InMemoryProductsRepository } from '../_repository/in-memory/in-memory-products-repository'
import { FetchAllProductsUseCase } from './fetch-all-products'

let productsRepository: InMemoryProductsRepository
let sut: FetchAllProductsUseCase
describe('Fetching all products Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new FetchAllProductsUseCase(productsRepository)
  })

  it('should be able to fetching all products', async () => {
    await productsRepository.create({
      name: 'Black shirt',
      price: 30,
      description: 'This is a black shirt',
      slug: createSlug('Black shirt'),
      categorySlug: 'slug',
    })

    await productsRepository.create({
      name: 'Red shirt',
      price: 30,
      description: 'This is a red shirt',
      slug: createSlug('Red shirt'),
      categorySlug: 'slug',
    })

    const { products } = await sut.execute()

    expect(products.length).toEqual(2)
  })
})
