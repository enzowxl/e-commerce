import { api } from '../../../utils/api'
import { CategoryNotExistsError } from '../_errors/category-not-exists-error'
import { CategoriesRepository } from '../_repository/categories-repository'

interface DeleteCategoryUseCaseRequest {
  slug: string
}

export class DeleteCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}
  async execute({ slug }: DeleteCategoryUseCaseRequest) {
    const categoryWithSlug = await this.categoriesRepository.findBySlug(slug)

    if (!categoryWithSlug) throw new CategoryNotExistsError()

    if (categoryWithSlug.photoId) {
      await api(`/utils/image/delete/${categoryWithSlug.photoId}`, {
        method: 'DELETE',
      })
    }

    const deleteCategory = await this.categoriesRepository.delete(slug)

    return { category: deleteCategory }
  }
}
