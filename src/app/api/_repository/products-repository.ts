import { Prisma, Product } from '@prisma/client'

export interface ProductsRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
  update(
    slug: string,
    data: Prisma.ProductUncheckedUpdateInput,
  ): Promise<Product | null>
  findBySlug(slug: string): Promise<Product | null>
  delete(slug: string): Promise<Product | null>
  findMany(): Promise<Product[]>
}
