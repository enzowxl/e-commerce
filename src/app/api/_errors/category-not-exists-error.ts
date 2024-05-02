export class CategoryNotExistsError extends Error {
  constructor() {
    super('Category not exists')
  }
}
