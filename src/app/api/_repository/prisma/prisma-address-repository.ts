import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { AddressRepository } from '../address-repository'

export class PrismaAddressRepository implements AddressRepository {
  async create(data: Prisma.AddressCreateInput) {
    return await prisma.address.create({
      data,
    })
  }

  async update(id: string, data: Prisma.AddressUpdateInput) {
    return await prisma.address.update({
      where: {
        id,
      },
      data,
    })
  }

  async findByUserEmail(email: string) {
    return await prisma.address.findFirst({
      where: {
        user: {
          some: {
            email,
          },
        },
      },
    })
  }
}
