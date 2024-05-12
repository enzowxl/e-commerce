import { randomUUID } from 'node:crypto'

import { Prisma, User, UserRoles } from '@prisma/client'

import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async findMany() {
    return this.users
  }

  async create(data: Prisma.UserCreateInput) {
    const createUser: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      photoUrl: data.photoUrl as string,
      photoId: data.photoId as string,
      role: data.role as UserRoles,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(createUser)

    return createUser
  }

  async update(email: string, data: Prisma.UserUpdateInput) {
    const findUserIndex = this.users.findIndex((user) => user.email === email)

    if (findUserIndex === -1) return null

    const updatedUser = { ...this.users[findUserIndex] }

    Object.assign(updatedUser, data)

    updatedUser.updatedAt = new Date()

    this.users[findUserIndex] = updatedUser

    return updatedUser
  }

  async findByEmail(email: string) {
    const findUser = this.users.find((user) => user.email === email)

    if (!findUser) return null

    return findUser
  }

  async findById(id: string) {
    const findUser = this.users.find((user) => user.id === id)

    if (!findUser) return null

    return findUser
  }

  async delete(email: string) {
    const findUserIndex = this.users.findIndex((user) => user.email === email)

    if (findUserIndex === -1) return null

    const deletedUser = this.users.splice(findUserIndex, 1)[0]

    return deletedUser
  }
}
