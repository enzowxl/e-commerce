import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { UserNotExistsError } from '../_errors/user-not-exists-error'
import { InMemoryUsersRepository } from '../_repository/in-memory/in-memory-users-repository'
import { DeleteUserUseCase } from './delete-user'

let usersRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteUserUseCase(usersRepository)
  })

  it('should be able to delete a user', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
    })

    expect(user?.id).toEqual(expect.any(String))
  })

  it('should be possible to delete an account that doesnt exist', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(UserNotExistsError)
  })
})
