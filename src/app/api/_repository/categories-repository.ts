import { Category, Prisma } from '@prisma/client'

export interface CategoriesRepository {
  create(data: Prisma.CategoryCreateInput): Promise<Category>
  update(
    slug: string,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category | null>
  findBySlug(slug: string): Promise<Category | null>
  findById(id: string): Promise<Category | null>
  delete(slug: string): Promise<Category | null>
  findMany(): Promise<Category[]>
}
