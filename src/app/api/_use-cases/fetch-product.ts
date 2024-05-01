import { ProductNotExistsError } from '../_errors/product-not-exists-error'
import { ProductsRepository } from '../_repository/products-repository'

interface FetchProductUseCaseRequest {
  slug: string
}

export class FetchProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}
  async execute({ slug }: FetchProductUseCaseRequest) {
    const productWithSlug = await this.productsRepository.findBySlug(slug)

    if (!productWithSlug) throw new ProductNotExistsError()

    return { product: productWithSlug }
  }
}
