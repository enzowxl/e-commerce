import { CategoryNotExistsError } from '../_errors/category-not-exists-error'
import { CategoriesRepository } from '../_repository/categories-repository'

interface FetchCategoryUseCaseRequest {
  slug: string
}

export class FetchCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}
  async execute({ slug }: FetchCategoryUseCaseRequest) {
    const categoryWithSlug = await this.categoriesRepository.findBySlug(slug)

    if (!categoryWithSlug) throw new CategoryNotExistsError()

    return { category: categoryWithSlug }
  }
}
