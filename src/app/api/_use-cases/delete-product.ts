import { ProductNotExistsError } from '../_errors/product-not-exists-error'
import { ProductsRepository } from '../_repository/products-repository'

interface DeleteProductUseCaseRequest {
  slug: string
}

export class DeleteProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}
  async execute({ slug }: DeleteProductUseCaseRequest) {
    const productWithSlug = await this.productsRepository.findBySlug(slug)

    if (!productWithSlug) throw new ProductNotExistsError()

    const deleteProduct = await this.productsRepository.delete(slug)

    return { product: deleteProduct }
  }
}
