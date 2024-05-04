import { PrismaUserRepository } from '../../_repository/prisma/prisma-users-repository'
import { FetchAllUsersUseCase } from '../fetch-all-users'

export function makeFetchAllUsersUseCase() {
  const usersRepository = new PrismaUserRepository()
  const fetchAllUsersUseCase = new FetchAllUsersUseCase(usersRepository)

  return fetchAllUsersUseCase
}
