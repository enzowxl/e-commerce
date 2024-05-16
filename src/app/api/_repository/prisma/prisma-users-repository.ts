import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findMany() {
    return await prisma.user.findMany()
  }

  async delete(email: string) {
    return await prisma.user.delete({
      where: {
        email,
      },
    })
  }

  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data,
    })
  }

  update(email: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: {
        email,
      },
      data,
    })
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        address: true,
      },
    })
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    })
  }
}
