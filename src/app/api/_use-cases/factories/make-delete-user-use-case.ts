import { PrismaUserRepository } from '../../_repository/prisma/prisma-users-repository'
import { DeleteUserUseCase } from '../delete-user'

export function makeDeleteUserUseCase() {
  const usersRepository = new PrismaUserRepository()
  const deleteUserUseCase = new DeleteUserUseCase(usersRepository)

  return deleteUserUseCase
}
