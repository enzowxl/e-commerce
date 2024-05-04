import { beforeEach, describe, expect, it } from 'vitest'

import { CategoryNotExistsError } from '../_errors/category-not-exists-error'
import { InMemoryCategoriesRepository } from '../_repository/in-memory/in-memory-categories-repository'
import { UpdateCategoryUseCase } from './update-category'

let categoriesRepository: InMemoryCategoriesRepository
let sut: UpdateCategoryUseCase

function createSlug(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()
}
describe('Update category Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new UpdateCategoryUseCase(categoriesRepository)
  })

  it('should be able to update a category', async () => {
    await categoriesRepository.create({
      name: 'Gym',
      slug: createSlug('Gym'),
    })

    const { category } = await sut.execute({
      slug: createSlug('Gym'),
      data: {
        name: 'Casual',
        slug: createSlug('casual'),
      },
    })

    expect(category?.name).toEqual('Casual')
  })

  it('should be possible to update an category that doesnt exist', async () => {
    await expect(() =>
      sut.execute({
        slug: createSlug('Gym'),
        data: {
          name: 'Casual',
          slug: createSlug('casual'),
        },
      }),
    ).rejects.toBeInstanceOf(CategoryNotExistsError)
  })
})
