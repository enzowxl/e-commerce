import { beforeEach, describe, expect, it } from 'vitest'

import { createSlug } from '../../../utils/create-slug'
import { CategoryNotExistsError } from '../_errors/category-not-exists-error'
import { ProductAlreadyExistsError } from '../_errors/product-already-exists-error'
import { InMemoryCategoriesRepository } from '../_repository/in-memory/in-memory-categories-repository'
import { InMemoryProductsRepository } from '../_repository/in-memory/in-memory-products-repository'
import { CreateProductUseCase } from './create-product'

let productsRepository: InMemoryProductsRepository
let categoriesRepository: InMemoryCategoriesRepository
let sut: CreateProductUseCase
describe('Create product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new CreateProductUseCase(productsRepository, categoriesRepository)
  })

  it('should be able to create a product', async () => {
    const category = await categoriesRepository.create({
      name: 'Casual',
      slug: createSlug('casual'),
    })

    const { product } = await sut.execute({
      name: 'Black shirt',
      price: 30,
      description: 'This is a shirt',
      slug: createSlug('Black shirt'),
      type: 'T_SHIRT',
      categorySlug: category.slug,
    })

    expect(product.id).toEqual(expect.any(String))
  })

  it('should not be able to create a product with the same slug twice', async () => {
    const name = 'Black shirt'

    const category = await categoriesRepository.create({
      name: 'Casual',
      slug: createSlug('casual'),
    })

    await sut.execute({
      name,
      price: 30,
      description: 'This is a shirt',
      slug: createSlug(name),
      type: 'T_SHIRT',
      categorySlug: category.slug,
    })

    await expect(() =>
      sut.execute({
        name,
        price: 30,
        description: 'This is a shirt',
        slug: createSlug(name),
        type: 'T_SHIRT',
        categorySlug: category.slug,
      }),
    ).rejects.toBeInstanceOf(ProductAlreadyExistsError)
  })

  it('should be able to when creating a product the slug be correct', async () => {
    const category = await categoriesRepository.create({
      name: 'Casual',
      slug: createSlug('casual'),
    })

    const { product } = await sut.execute({
      name: 'Black shirt',
      price: 30,
      description: 'This is a shirt',
      slug: createSlug('Black shirt'),
      type: 'T_SHIRT',
      categorySlug: category.slug,
    })

    expect(product.slug).toEqual('black-shirt')
  })

  it('should be able to tentative for creating product but, category id is invalid', async () => {
    await expect(() =>
      sut.execute({
        name: 'Black shirt',
        price: 30,
        description: 'This is a shirt',
        slug: createSlug('Black shirt'),
        type: 'T_SHIRT',
        categorySlug: 'slug',
      }),
    ).rejects.toBeInstanceOf(CategoryNotExistsError)
  })
})
