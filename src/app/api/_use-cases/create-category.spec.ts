import { beforeEach, describe, expect, it } from 'vitest'

import { createSlug } from '../../../utils/create-slug'
import { CategoryAlreadyExistsError } from '../_errors/category-already.exists-error'
import { InMemoryCategoriesRepository } from '../_repository/in-memory/in-memory-categories-repository'
import { CreateCategoryUseCase } from './create-category'

let categoriesRepository: InMemoryCategoriesRepository
let sut: CreateCategoryUseCase
describe('Create category Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new CreateCategoryUseCase(categoriesRepository)
  })

  it('should be able to create a category', async () => {
    const { category } = await sut.execute({
      name: 'Gym',
      slug: createSlug('Gym'),
    })

    expect(category.id).toEqual(expect.any(String))
  })

  it('should not be able to create a category with the same slug twice', async () => {
    const name = 'Casual'

    await sut.execute({
      name,
      slug: createSlug('Casual'),
    })

    await expect(() =>
      sut.execute({
        name,
        slug: createSlug('Casual'),
      }),
    ).rejects.toBeInstanceOf(CategoryAlreadyExistsError)
  })

  it('should be able to when creating a category the slug be correct', async () => {
    const { category } = await sut.execute({
      name: 'Gym',
      slug: createSlug('Gym'),
    })

    expect(category.slug).toEqual('gym')
  })
})
