import { Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'

import { UserAlreadyExistsError } from '../_errors/user-already-exists-error'
import { UserNotExistsError } from '../_errors/user-not-exists-error'
import { UsersRepository } from '../_repository/users-repository'

interface UpdateUserUseCaseRequest {
  data: Prisma.UserUpdateInput
  email: string
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ email, data }: UpdateUserUseCaseRequest) {
    const userFromEmail = await this.usersRepository.findByEmail(email)

    if (!userFromEmail) throw new UserNotExistsError()

    if (data.email) {
      const userWithSameEmail = await this.usersRepository.findByEmail(
        data.email as string,
      )

      if (userWithSameEmail) throw new UserAlreadyExistsError()
    }

    if (data.passwordHash) {
      const newPasswordHash = await hash(data.passwordHash as string, 6)
      data.passwordHash = newPasswordHash
    }

    const updateUser = await this.usersRepository.update(email, data)

    return { user: updateUser }
  }
}
