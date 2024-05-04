import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { CategoriesRepository } from '../categories-repository'

export class PrismaCategoriesRepository implements CategoriesRepository {
  async findMany() {
    return await prisma.category.findMany()
  }

  async delete(slug: string) {
    return await prisma.category.delete({
      where: {
        slug,
      },
    })
  }

  async create(data: Prisma.CategoryCreateInput) {
    return await prisma.category.create({
      data,
    })
  }

  update(slug: string, data: Prisma.CategoryUpdateInput) {
    return prisma.category.update({
      where: {
        slug,
      },
      data,
    })
  }

  async findBySlug(slug: string) {
    return await prisma.category.findUnique({
      where: {
        slug,
      },
    })
  }
}
