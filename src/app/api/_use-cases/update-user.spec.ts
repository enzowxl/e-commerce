import { compare, hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { UserNotExistsError } from '../_errors/user-not-exists-error'
import { InMemoryUsersRepository } from '../_repository/in-memory/in-memory-users-repository'
import { UpdateUserUseCase } from './update-user'

let usersRepository: InMemoryUsersRepository
let sut: UpdateUserUseCase

describe('Update User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserUseCase(usersRepository)
  })

  it('should be able to update a user', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      data: {
        name: 'Doe John',
      },
    })

    expect(user?.name).toEqual('Doe John')
  })

  it('should be possible to update an account that doesnt exist', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        data: {
          name: 'Doe John',
        },
      }),
    ).rejects.toBeInstanceOf(UserNotExistsError)
  })

  it('should hash user password upon updated', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      data: {
        passwordHash: '123123',
      },
    })

    const isNewPasswordCorrectlyHashed = await compare(
      '123123',
      String(user?.passwordHash),
    )

    expect(isNewPasswordCorrectlyHashed).toBe(true)
  })
})
