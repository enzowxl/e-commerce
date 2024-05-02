import { beforeEach, describe, expect, it } from 'vitest'

import { ProductNotExistsError } from '../_errors/product-not-exists-error'
import { InMemoryProductsRepository } from '../_repository/in-memory/in-memory-products-repository'
import { UpdateProductUseCase } from './update-product'

let productsRepository: InMemoryProductsRepository
let sut: UpdateProductUseCase

function createSlug(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()
}
describe('Update product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new UpdateProductUseCase(productsRepository)
  })

  it('should be able to update a product', async () => {
    await productsRepository.create({
      name: 'Black shirt',
      price: 30,
      description: 'This is a dress',
      slug: createSlug('Black shirt'),
      type: 'T_SHIRT',
      categoryId: 'category-id',
    })

    const { product } = await sut.execute({
      slug: createSlug('Black shirt'),
      data: {
        name: 'Red shirt',
      },
    })

    expect(product?.name).toEqual('Red shirt')
  })

  it('should be possible to update an product that doesnt exist', async () => {
    await expect(() =>
      sut.execute({
        slug: createSlug('Black shirt'),
        data: {
          name: 'Red shirt',
        },
      }),
    ).rejects.toBeInstanceOf(ProductNotExistsError)
  })
})
