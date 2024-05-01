import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { UserNotExistsError } from '../_errors/user-not-exists-error'
import { InMemoryUsersRepository } from '../_repository/in-memory/in-memory-users-repository'
import { FetchUserUseCase } from './fetch-user'

let usersRepository: InMemoryUsersRepository
let sut: FetchUserUseCase

describe('Fetching user Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchUserUseCase(usersRepository)
  })

  it('should be able to fetching a user', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be possible to search for a non-existing user', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(UserNotExistsError)
  })
})
