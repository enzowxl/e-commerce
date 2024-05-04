import { PrismaUserRepository } from '../../_repository/prisma/prisma-users-repository'
import { UpdateUserUseCase } from '../update-user'

export function makeUpdateUserUseCase() {
  const usersRepository = new PrismaUserRepository()
  const updateProduct = new UpdateUserUseCase(usersRepository)

  return updateProduct
}
