import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  update(email: string, data: Prisma.UserUpdateInput): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  delete(email: string): Promise<User | null>
}
