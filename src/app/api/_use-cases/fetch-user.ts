import { UserNotExistsError } from '../_errors/user-not-exists-error'
import { UsersRepository } from '../_repository/users-repository'

interface FetchUserUseCaseRequest {
  email: string
}

export class FetchUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ email }: FetchUserUseCaseRequest) {
    const userWithEmail = await this.usersRepository.findByEmail(email)

    if (!userWithEmail) throw new UserNotExistsError()

    return { user: userWithEmail }
  }
}
