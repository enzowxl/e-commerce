import { randomUUID } from 'node:crypto'

import { Category, Prisma } from '@prisma/client'

import { CategoriesRepository } from '../categories-repository'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public categories: Category[] = []

  async findMany() {
    return this.categories
  }

  async create(data: Prisma.CategoryCreateInput) {
    const createCategory: Category = {
      id: randomUUID(),
      slug: data.slug,
      name: data.name,
      photoUrl: data.photoUrl as string,
      photoId: data.photoId as string,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.categories.push(createCategory)

    return createCategory
  }

  async update(slug: string, data: Prisma.CategoryUpdateInput) {
    const findCategoryIndex = this.categories.findIndex(
      (category) => category.slug === slug,
    )

    if (findCategoryIndex === -1) return null

    const updatedCategory = { ...this.categories[findCategoryIndex] }

    Object.assign(updatedCategory, data)

    updatedCategory.updatedAt = new Date()

    this.categories[findCategoryIndex] = updatedCategory

    return updatedCategory
  }

  async findBySlug(slug: string) {
    const findCategory = this.categories.find(
      (category) => category.slug === slug,
    )

    if (!findCategory) return null

    return findCategory
  }

  async delete(slug: string) {
    const findCategoryIndex = this.categories.findIndex(
      (category) => category.slug === slug,
    )

    if (findCategoryIndex === -1) return null

    const deletedCategory = this.categories.splice(findCategoryIndex, 1)[0]

    return deletedCategory
  }
}
