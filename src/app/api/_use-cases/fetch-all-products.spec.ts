import { beforeEach, describe, expect, it } from 'vitest'

import { createSlug } from '../../../utils/create-slug'
import { CategoryNotExistsError } from '../_errors/category-not-exists-error'
import { InMemoryCategoriesRepository } from '../_repository/in-memory/in-memory-categories-repository'
import { InMemoryProductsRepository } from '../_repository/in-memory/in-memory-products-repository'
import { FetchAllProductsUseCase } from './fetch-all-products'

let productsRepository: InMemoryProductsRepository
let categoriesRepository: InMemoryCategoriesRepository
let sut: FetchAllProductsUseCase
describe('Fetching all products Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new FetchAllProductsUseCase(productsRepository, categoriesRepository)
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

    const { products } = await sut.execute({ type: 'ALL' })

    expect(products.length).toEqual(2)
  })

  it('should be able to fetching all products by categorySlug', async () => {
    await categoriesRepository.create({
      name: 'Gym',
      slug: createSlug('Gym'),
    })

    await productsRepository.create({
      name: 'Black shirt',
      price: 30,
      description: 'This is a black shirt',
      slug: createSlug('Black shirt'),
      categorySlug: 'gym',
    })

    await productsRepository.create({
      name: 'Red shirt',
      price: 30,
      description: 'This is a red shirt',
      slug: createSlug('Red shirt'),
      categorySlug: 'casual',
    })

    const { products } = await sut.execute({
      type: 'CATEGORY',
      categorySlug: 'gym',
    })

    expect(products.length).toEqual(1)
  })

  it('should be able to fetching all products by discount', async () => {
    await productsRepository.create({
      name: 'Black shirt',
      price: 30,
      description: 'This is a black shirt',
      slug: createSlug('Black shirt'),
      discount: 10,
      categorySlug: 'gym',
    })

    await productsRepository.create({
      name: 'Red shirt',
      price: 30,
      description: 'This is a red shirt',
      slug: createSlug('Red shirt'),
      categorySlug: 'casual',
    })

    const { products } = await sut.execute({
      type: 'OFFER',
    })

    expect(products.length).toEqual(1)
  })

  it('should be able to fetching all products by query', async () => {
    await productsRepository.create({
      name: 'Black shirt',
      price: 30,
      description: 'This is a black shirt',
      slug: createSlug('Black shirt'),
      discount: 10,
      categorySlug: 'gym',
    })

    await productsRepository.create({
      name: 'Red shirt',
      price: 30,
      description: 'This is a red shirt',
      slug: createSlug('Red shirt'),
      categorySlug: 'casual',
    })

    await productsRepository.create({
      name: 'PlayStation 5',
      price: 30,
      description: 'This is a PlayStation',
      slug: createSlug('PlayStation5'),
      categorySlug: 'electronics',
    })

    const { products } = await sut.execute({
      type: 'QUERY',
      query: 'shirt',
    })

    expect(products.length).toEqual(2)
  })

  it('should be not able to fetching all products by categorySlug nonexistent', async () => {
    await productsRepository.create({
      name: 'Black shirt',
      price: 30,
      description: 'This is a black shirt',
      slug: createSlug('Black shirt'),
      discount: 10,
      categorySlug: 'gym',
    })

    await productsRepository.create({
      name: 'Red shirt',
      price: 30,
      description: 'This is a red shirt',
      slug: createSlug('Red shirt'),
      categorySlug: 'casual',
    })

    await productsRepository.create({
      name: 'PlayStation 5',
      price: 30,
      description: 'This is a PlayStation',
      slug: createSlug('PlayStation5'),
      categorySlug: 'electronics',
    })

    await expect(() =>
      sut.execute({
        type: 'CATEGORY',
        categorySlug: 'gym',
      }),
    ).rejects.toBeInstanceOf(CategoryNotExistsError)
  })
})
