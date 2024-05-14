import { getProducts } from '@/app/(shop)/_actions/get-products'
import { BasePage } from '@/components/base-page'

import { ProductList } from './_components/product/product-list'

export default async function Shop() {
  const products = await getProducts()

  return (
    <BasePage>
      <div className="flex flex-col gap-14">
        <ProductList
          filter={(product) => product.discount > 0}
          title="Offers"
          products={products}
        />
        <ProductList title="All" products={products} />
        <ProductList
          filter={(product) => product.categorySlug === 'gym'}
          title="Gym"
          products={products}
        />
        <ProductList
          filter={(product) => product.categorySlug === 'casual'}
          title="Casual"
          products={products}
        />
        <ProductList
          filter={(product) => product.categorySlug === 'electronics'}
          title="Electronics"
          products={products}
        />
      </div>
    </BasePage>
  )
}
