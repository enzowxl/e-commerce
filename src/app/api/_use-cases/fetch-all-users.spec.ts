import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '../_repository/in-memory/in-memory-users-repository'
import { FetchAllUsersUseCase } from './fetch-all-users'

let usersRepository: InMemoryUsersRepository
let sut: FetchAllUsersUseCase

describe('Fetching all users Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchAllUsersUseCase(usersRepository)
  })

  it('should be able to fetching all users', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
    })

    await usersRepository.create({
      name: 'Doe john',
      email: 'doejohn@example.com',
      passwordHash: await hash('123456', 6),
    })

    const { users } = await sut.execute()

    expect(users.length).toEqual(2)
  })
})
