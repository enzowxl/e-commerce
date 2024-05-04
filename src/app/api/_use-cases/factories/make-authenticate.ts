import { PrismaUserRepository } from '../../_repository/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUserRepository()
  const authenticateUserUseCase = new AuthenticateUseCase(usersRepository)
  return authenticateUserUseCase
}
