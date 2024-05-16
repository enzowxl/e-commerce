import { PrismaAddressRepository } from '../../_repository/prisma/prisma-address-repository'
import { CreateAddressUseCase } from '../create-address'

export function makeCreateAddressUseCase() {
  const addressRepository = new PrismaAddressRepository()
  const createAddressUseCase = new CreateAddressUseCase(addressRepository)

  return createAddressUseCase
}
