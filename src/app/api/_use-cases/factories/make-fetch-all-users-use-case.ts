import { PrismaUsersRepository } from '../../_repository/prisma/prisma-users-repository'
import { FetchAllUsersUseCase } from '../fetch-all-users'

export function makeFetchAllUsersUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const fetchAllUsersUseCase = new FetchAllUsersUseCase(usersRepository)

  return fetchAllUsersUseCase
}
