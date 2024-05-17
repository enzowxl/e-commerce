import { UserNotExistsError } from '../_errors/user-not-exists-error'
import { OrdersRepository } from '../_repository/orders-repository'
import { UsersRepository } from '../_repository/users-repository'

interface FetchAllUserOrdersUseCaseRequest {
  email: string
}

export class FetchAllUserOrdersUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({ email }: FetchAllUserOrdersUseCaseRequest) {
    const userWithEmail = await this.usersRepository.findByEmail(email)

    if (!userWithEmail) throw new UserNotExistsError()

    const orders = await this.ordersRepository.findManyByUserId(
      userWithEmail.id,
    )

    return { orders }
  }
}
