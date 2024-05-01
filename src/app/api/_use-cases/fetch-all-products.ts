import { ProductsRepository } from '../_repository/products-repository'

export class FetchAllProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}
  async execute() {
    const products = await this.productsRepository.findMany()

    return { products }
  }
}
