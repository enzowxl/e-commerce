import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { ProductsRepository } from '../products-repository'

export class PrismaProductsRepository implements ProductsRepository {
  async findMany() {
    return await prisma.product.findMany()
  }

  async findByOffer() {
    return await prisma.product.findMany({
      where: {
        discount: {
          gt: 0,
        },
      },
    })
  }

  async findByCategorySlug(slug: string) {
    return await prisma.product.findMany({
      where: {
        category: {
          slug,
        },
      },
    })
  }

  async findByQuery(query: string) {
    return await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    })
  }

  async delete(slug: string) {
    return await prisma.product.delete({
      where: {
        slug,
      },
    })
  }

  async create(data: Prisma.ProductUncheckedCreateInput) {
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
