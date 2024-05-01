import { UsersRepository } from '../_repository/users-repository'

export class FetchAllUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute() {
    const users = await this.usersRepository.findMany()

    return { users }
  }
}
