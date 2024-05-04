import { PrismaUserRepository } from '../../_repository/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUserRepository()
  const fetchUserUseCase = new RegisterUseCase(usersRepository)

  return fetchUserUseCase
}
