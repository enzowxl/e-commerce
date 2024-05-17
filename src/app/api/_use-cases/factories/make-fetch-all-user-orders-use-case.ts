import { PrismaOrdersRepository } from '../../_repository/prisma/prisma-orders-repository'
import { PrismaUsersRepository } from '../../_repository/prisma/prisma-users-repository'
import { FetchAllUserOrdersUseCase } from '../fetch-all-user-orders'

export function makeFetchAllUserOrdersUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const ordersRepository = new PrismaOrdersRepository()
  const fetchAllUserOrdersUseCase = new FetchAllUserOrdersUseCase(
    usersRepository,
    ordersRepository,
  )

  return fetchAllUserOrdersUseCase
}
