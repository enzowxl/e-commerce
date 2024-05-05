import { PrismaUsersRepository } from '../../_repository/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const fetchUserUseCase = new RegisterUseCase(usersRepository)

  return fetchUserUseCase
}
