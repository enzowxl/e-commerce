import { Prisma, Product } from '@prisma/client'

export interface ProductsRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>
  update(slug: string, data: Prisma.ProductUpdateInput): Promise<Product | null>
  findBySlug(slug: string): Promise<Product | null>
  delete(slug: string): Promise<Product | null>
}
