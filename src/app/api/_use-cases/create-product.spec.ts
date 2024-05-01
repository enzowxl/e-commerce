import { beforeEach, describe, expect, it } from 'vitest'

import { ProductAlreadyExistsError } from '../_errors/product-already-exists-error'
import { InMemoryProductsRepository } from '../_repository/in-memory/in-memory-products-repository'
import { CreateProductUseCase } from './create-product'

let productsRepository: InMemoryProductsRepository
let sut: CreateProductUseCase

function createSlug(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()
}
describe('Create product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new CreateProductUseCase(productsRepository)
  })

  it('should be able to create a product', async () => {
    const { product } = await sut.execute({
      name: 'Black shirt',
      price: 30,
      description: 'This is a dress',
      slug: createSlug('Black shirt'),
      type: 'TSHIRT',
    })

    expect(product.id).toEqual(expect.any(String))
  })

  it('should not be able to create a product with the same slug twice', async () => {
    const name = 'Black shirt'

    await sut.execute({
      name,
      price: 30,
      description: 'This is a dress',
      slug: createSlug(name),
      type: 'TSHIRT',
    })

    await expect(() =>
      sut.execute({
        name,
        price: 30,
        description: 'This is a dress',
        slug: createSlug(name),
        type: 'TSHIRT',
      }),
    ).rejects.toBeInstanceOf(ProductAlreadyExistsError)
  })

  it('should be able to when creating a product the slug be correct', async () => {
    const { product } = await sut.execute({
      name: 'Black shirt',
      price: 30,
      description: 'This is a dress',
      slug: createSlug('Black shirt'),
      type: 'TSHIRT',
    })

    expect(product.slug).toEqual('black-shirt')
  })
})
