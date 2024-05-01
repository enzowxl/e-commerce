import { UserNotExistsError } from '../_errors/user-not-exists-error'
import { UsersRepository } from '../_repository/users-repository'

interface DeleteUserUseCaseRequest {
  email: string
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ email }: DeleteUserUseCaseRequest) {
    const userFromEmail = await this.usersRepository.findByEmail(email)

    if (!userFromEmail) throw new UserNotExistsError()

    const deleteUserFromEmail = await this.usersRepository.delete(email)

    return { user: deleteUserFromEmail }
  }
}
