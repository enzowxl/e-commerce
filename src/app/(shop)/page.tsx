import { getProducts } from '@/actions/get-products'
import { BasePage } from '@/components/base-page'

import { ProductList } from './_components/product/product-list'

export default async function Shop() {
  const products = await getProducts()

  return (
    <BasePage>
      <ProductList products={products} />
    </BasePage>
  )
}
