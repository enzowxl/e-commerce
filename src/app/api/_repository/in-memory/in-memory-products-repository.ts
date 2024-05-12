import { randomUUID } from 'node:crypto'

import { Prisma, Product, ProductTypes } from '@prisma/client'

import { ProductsRepository } from '../products-repository'

export class InMemoryProductsRepository implements ProductsRepository {
  public products: Product[] = []

  async findMany() {
    return this.products
  }

  async create(data: Prisma.ProductUncheckedCreateInput) {
    const createProduct: Product = {
      id: randomUUID(),
      slug: data.slug,
      name: data.name,
      description: data.description as string,
      price: new Prisma.Decimal(data.price as number),
      type: data.type as ProductTypes,
      categorySlug: data.categorySlug as string,
      discount: data.discount as number,
      photoUrl: data.photoUrl as string,
      photoId: data.photoId as string,
      colors: data.colors as string[],
      sizes: data.sizes as string[],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.products.push(createProduct)

    return createProduct
  }

  async update(slug: string, data: Prisma.ProductUpdateInput) {
    const findProductIndex = this.products.findIndex(
      (product) => product.slug === slug,
    )

    if (findProductIndex === -1) return null

    const updatedProduct = { ...this.products[findProductIndex] }

    Object.assign(updatedProduct, data)

    updatedProduct.updatedAt = new Date()

    this.products[findProductIndex] = updatedProduct

    return updatedProduct
  }

  async findBySlug(slug: string) {
    const findProduct = this.products.find((product) => product.slug === slug)

    if (!findProduct) return null

    return findProduct
  }

  async delete(slug: string) {
    const findProductIndex = this.products.findIndex(
      (product) => product.slug === slug,
    )

    if (findProductIndex === -1) return null

    const deletedProduct = this.products.splice(findProductIndex, 1)[0]

    return deletedProduct
  }
}
