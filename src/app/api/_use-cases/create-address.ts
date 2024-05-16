import { Prisma } from '@prisma/client'

import { AddressRepository } from '../_repository/address-repository'

interface CreateAddressUseCaseRequest extends Prisma.AddressCreateInput {
  email: string
}

export class CreateAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}
  async execute({
    email,
    address,
    city,
    district,
    number,
    state,
    zip,
    complement,
  }: CreateAddressUseCaseRequest) {
    let addressWithUserEmail =
      await this.addressRepository.findByUserEmail(email)

    if (!addressWithUserEmail) {
      addressWithUserEmail = await this.addressRepository.create({
        address,
        city,
        district,
        number,
        state,
        zip,
        complement,
        user: {
          connect: {
            email,
          },
        },
      })
    } else {
      addressWithUserEmail = await this.addressRepository.update(
        addressWithUserEmail.id,
        {
          address,
          city,
          district,
          number,
          state,
          zip,
          complement,
        },
      )
    }

    return { address: addressWithUserEmail }
  }
}
