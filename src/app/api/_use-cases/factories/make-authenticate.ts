import { PrismaUsersRepository } from '../../_repository/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUserUseCase = new AuthenticateUseCase(usersRepository)
  return authenticateUserUseCase
}
