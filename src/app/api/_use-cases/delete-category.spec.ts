import { beforeEach, describe, expect, it } from 'vitest'

import { createSlug } from '../../../utils/create-slug'
import { CategoryNotExistsError } from '../_errors/category-not-exists-error'
import { InMemoryCategoriesRepository } from '../_repository/in-memory/in-memory-categories-repository'
import { DeleteCategoryUseCase } from './delete-category'

let categoriesRepository: InMemoryCategoriesRepository
let sut: DeleteCategoryUseCase
describe('Delete category Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new DeleteCategoryUseCase(categoriesRepository)
  })

  it('should be able to delete a category', async () => {
    await categoriesRepository.create({
      name: 'Casual',
      slug: createSlug('casual'),
    })

    const { category } = await sut.execute({
      slug: 'casual',
    })

    expect(category?.id).toEqual(expect.any(String))
  })

  it('should not be possible to delete for a non-existing category', async () => {
    await expect(() =>
      sut.execute({
        slug: 'gym',
      }),
    ).rejects.toBeInstanceOf(CategoryNotExistsError)
  })
})
