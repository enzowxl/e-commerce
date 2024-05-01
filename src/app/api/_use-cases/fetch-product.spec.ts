import { beforeEach, describe, expect, it } from 'vitest'

import { ProductNotExistsError } from '../_errors/product-not-exists-error'
import { InMemoryProductsRepository } from '../_repository/in-memory/in-memory-products-repository'
import { FetchProductUseCase } from './fetch-product'

let productsRepository: InMemoryProductsRepository
let sut: FetchProductUseCase

function createSlug(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()
}
describe('Fetching product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new FetchProductUseCase(productsRepository)
  })

  it('should be able to fetching a product', async () => {
    await productsRepository.create({
      name: 'Black shirt',
      price: 30,
      description: 'This is a dress',
      slug: createSlug('Black shirt'),
      type: 'TSHIRT',
    })

    const { product } = await sut.execute({
      slug: 'black-shirt',
    })

    expect(product.id).toEqual(expect.any(String))
  })

  it('should not be possible to search for a non-existing product', async () => {
    await expect(() =>
      sut.execute({
        slug: 'black-shirt',
      }),
    ).rejects.toBeInstanceOf(ProductNotExistsError)
  })
})
