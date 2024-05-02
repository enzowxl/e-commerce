import { CategoriesRepository } from '../_repository/categories-repository'

export class FetchAllCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}
  async execute() {
    const categories = await this.categoriesRepository.findMany()

    return { categories }
  }
}
