import { beforeEach, describe, expect, it } from 'vitest'

import { createSlug } from '../../../utils/create-slug'
import { InMemoryCategoriesRepository } from '../_repository/in-memory/in-memory-categories-repository'
import { FetchAllCategoriesUseCase } from './fetch-all-categories'

let categoriesRepository: InMemoryCategoriesRepository
let sut: FetchAllCategoriesUseCase
describe('Fetching all categories Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new FetchAllCategoriesUseCase(categoriesRepository)
  })

  it('should be able to fetching all categories', async () => {
    await categoriesRepository.create({
      name: 'Casual',
      slug: createSlug('casual'),
    })

    await categoriesRepository.create({
      name: 'Gym',
      slug: createSlug('Gym'),
    })

    const { categories } = await sut.execute()

    expect(categories.length).toEqual(2)
  })
})
