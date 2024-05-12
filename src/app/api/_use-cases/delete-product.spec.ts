import { beforeEach, describe, expect, it } from 'vitest'

import { createSlug } from '../../../utils/create-slug'
import { ProductNotExistsError } from '../_errors/product-not-exists-error'
import { InMemoryProductsRepository } from '../_repository/in-memory/in-memory-products-repository'
import { DeleteProductUseCase } from './delete-product'

let productsRepository: InMemoryProductsRepository
let sut: DeleteProductUseCase
describe('Delete product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new DeleteProductUseCase(productsRepository)
  })

  it('should be able to delete a product', async () => {
    await productsRepository.create({
      name: 'Black shirt',
      price: 30,
      description: 'This is a shirt',
      slug: createSlug('Black shirt'),
      type: 'T_SHIRT',
      categorySlug: 'slug',
    })

    const { product } = await sut.execute({
      slug: 'black-shirt',
    })

    expect(product?.id).toEqual(expect.any(String))
  })

  it('should not be possible to delete for a non-existing product', async () => {
    await expect(() =>
      sut.execute({
        slug: 'black-shirt',
      }),
    ).rejects.toBeInstanceOf(ProductNotExistsError)
  })
})
