import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { ProductsRepository } from '../products-repository'

export class PrismaProductsRepository implements ProductsRepository {
  async delete(slug: string) {
    return await prisma.product.delete({
      where: {
        slug,
      },
    })
  }

  async create(data: Prisma.ProductCreateInput) {
    return await prisma.product.create({
      data,
    })
  }

  update(slug: string, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({
      where: {
        slug,
      },
      data,
    })
  }

  async findBySlug(slug: string) {
    return await prisma.product.findUnique({
      where: {
        slug,
      },
    })
  }
}
