import { Product } from '@prisma/client'

export const formatPriceDiscount = (product: Product): number => {
  if (product.discount === 0) {
    return Number(product.price)
  }

  const discount = Number(product.price) * (product.discount / 100)

  return Number(product.price) - discount
}
