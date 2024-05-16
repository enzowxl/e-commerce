import { randomUUID } from 'node:crypto'

import { Address, Prisma } from '@prisma/client'

import { AddressRepository } from '../address-repository'

interface AddressPayload
  extends Prisma.AddressGetPayload<{
    include: {
      user: true
    }
  }> {}

interface AddressData extends Prisma.AddressCreateInput {
  email: string
}

export class InMemoryAddressRepository implements AddressRepository {
  public addresses: AddressPayload[] = []

  async create(data: AddressData) {
    const createAddress: Address = {
      id: randomUUID(),
      address: data.address,
      city: data.city,
      complement: data.complement as string,
      number: data.number,
      state: data.state,
      zip: data.zip,
      district: data.district,
    }

    this.addresses.push({
      ...createAddress,
      user: [{ email: data.email }],
    } as AddressPayload)

    return createAddress
  }

  async update(id: string, data: Prisma.AddressUpdateInput) {
    const findAddressIndex = this.addresses.findIndex(
      (address) => address.id === id,
    )

    if (findAddressIndex === -1) return null

    const updatedAddress = { ...this.addresses[findAddressIndex] }

    Object.assign(updatedAddress, data)

    this.addresses[findAddressIndex] = updatedAddress

    return updatedAddress
  }

  async findByUserEmail(email: string) {
    const findAddressByUserEmail = this.addresses.find((address) =>
      address.user.filter((user) => user.email === email),
    )

    if (!findAddressByUserEmail) return null

    return findAddressByUserEmail
  }
}
