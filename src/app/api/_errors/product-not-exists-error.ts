export class ProductNotExistsError extends Error {
  constructor() {
    super('Product not exists')
  }
}
