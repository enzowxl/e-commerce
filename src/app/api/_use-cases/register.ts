import { UserRoles } from '@prisma/client'
import { hash } from 'bcryptjs'

import { UserAlreadyExistsError } from '../_errors/user-already-exists-error'
import { UsersRepository } from '../_repository/users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  role?: UserRoles
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ name, email, password, role }: RegisterUseCaseRequest) {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) throw new UserAlreadyExistsError()

    const createUser = await this.usersRepository.create({
      name,
      email,
      passwordHash,
      role,
    })

    return { user: createUser }
  }
}
