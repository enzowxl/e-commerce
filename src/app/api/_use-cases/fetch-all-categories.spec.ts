import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCategoriesRepository } from '../_repository/in-memory/in-memory-categories-repository'
import { FetchAllCategoriesUseCase } from './fetch-all-categories'

let categoriesRepository: InMemoryCategoriesRepository
let sut: FetchAllCategoriesUseCase

function createSlug(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()
}
describe('Fetching all categories Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new FetchAllCategoriesUseCase(categoriesRepository)
  })

  it('should be able to fetching all categories', async () => {
    await categoriesRepository.create({
      name: 'Casual',
      slug: createSlug('casual'),
      avatarUrl: '',
    })

    await categoriesRepository.create({
      name: 'Gym',
      slug: createSlug('Gym'),
      avatarUrl: '',
    })

    const { categories } = await sut.execute()

    expect(categories.length).toEqual(2)
  })
})
