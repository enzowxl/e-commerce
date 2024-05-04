import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryProductsRepository } from '../_repository/in-memory/in-memory-products-repository'
import { FetchAllProductsUseCase } from './fetch-all-products'

let productsRepository: InMemoryProductsRepository
let sut: FetchAllProductsUseCase

function createSlug(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()
}
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
      type: 'T_SHIRT',
      categorySlug: 'slug',
    })

    await productsRepository.create({
      name: 'Red shirt',
      price: 30,
      description: 'This is a red shirt',
      slug: createSlug('Red shirt'),
      type: 'T_SHIRT',
      categorySlug: 'slug',
    })

    const { products } = await sut.execute()

    expect(products.length).toEqual(2)
  })
})
