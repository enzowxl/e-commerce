import { compare } from 'bcryptjs'

import { AuthenticateUserError } from '../_errors/authenticate-user-error'
import { UsersRepository } from '../_repository/users-repository'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ email, password }: AuthenticateUseCaseRequest) {
    const userFromEmail = await this.usersRepository.findByEmail(email)

    if (!userFromEmail) throw new AuthenticateUserError()

    const isPasswordValid = await compare(password, userFromEmail.passwordHash)

    if (!isPasswordValid) throw new AuthenticateUserError()

    return { user: userFromEmail }
  }
}
