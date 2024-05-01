import { randomUUID } from 'node:crypto'

import { Prisma, Product } from '@prisma/client'

import { ProductsRepository } from '../products-repository'

export class InMemoryProductsRepository implements ProductsRepository {
  public products: Product[] = []

  async findMany() {
    return this.products
  }

  async create(data: Prisma.ProductCreateInput) {
    const createProduct: Product = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      price: data.price,
      type: data.type,
      discount: data.discount as number,
      avatarUrl: data.avatarUrl as string,
      slug: data.slug,
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
