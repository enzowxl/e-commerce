import { PrismaUserRepository } from '../../_repository/prisma/prisma-users-repository'
import { FetchUserUseCase } from '../fetch-user'

export function makeFetchUserUseCase() {
  const usersRepository = new PrismaUserRepository()
  const fetchUserUseCase = new FetchUserUseCase(usersRepository)

  return fetchUserUseCase
}
