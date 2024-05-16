import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryAddressRepository } from '../_repository/in-memory/in-memory-address-repository'
import { CreateAddressUseCase } from './create-address'

let addressRepository: InMemoryAddressRepository
let sut: CreateAddressUseCase
describe('Create address Use Case', () => {
  beforeEach(() => {
    addressRepository = new InMemoryAddressRepository()
    sut = new CreateAddressUseCase(addressRepository)
  })

  it('should be able to create a address', async () => {
    const { address } = await sut.execute({
      email: 'johndoe@example.com',
      address: 'Rua Teste',
      city: 'Teste',
      district: 'Teste',
      number: 123,
      state: 'Teste',
      zip: '12345678',
      complement: 'Teste',
    })

    expect(address?.id).toEqual(expect.any(String))
  })

  it('should be able to update a address', async () => {
    const { address } = await sut.execute({
      email: 'johndoe@example.com',
      address: 'Address ',
      city: 'City',
      district: 'District',
      number: 123,
      state: 'State',
      zip: '12345678',
      complement: 'Complement',
    })

    const updateAddress = await addressRepository.update(
      address?.id as string,
      {
        address: 'Address 2',
        city: 'City',
        district: 'District',
        number: 123,
        state: 'State',
        zip: '12345678',
        complement: 'Complement',
      },
    )

    expect(updateAddress?.address).toEqual('Address 2')
  })
})
