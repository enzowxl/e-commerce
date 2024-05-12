import { beforeEach, describe, expect, it } from 'vitest'

import { createSlug } from '../../../utils/create-slug'
import { ProductNotExistsError } from '../_errors/product-not-exists-error'
import { InMemoryProductsRepository } from '../_repository/in-memory/in-memory-products-repository'
import { FetchProductUseCase } from './fetch-product'

let productsRepository: InMemoryProductsRepository
let sut: FetchProductUseCase
describe('Fetching product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new FetchProductUseCase(productsRepository)
  })

  it('should be able to fetching a product', async () => {
    await productsRepository.create({
      name: 'Black shirt',
      price: 30,
      description: 'This is a shirt',
      slug: createSlug('Black shirt'),
      categorySlug: 'slug',
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
