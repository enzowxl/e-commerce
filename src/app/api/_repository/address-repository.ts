import { Address, Prisma } from '@prisma/client'

export interface AddressRepository {
  create(data: Prisma.AddressCreateInput): Promise<Address>
  update(id: string, data: Prisma.AddressUpdateInput): Promise<Address | null>
  findByUserEmail(email: string): Promise<Address | null>
}
