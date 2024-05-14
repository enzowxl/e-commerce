import { getProducts } from '@/app/(shop)/_actions/get-products'
import { BasePage } from '@/components/base-page'

import { getCategories } from './_actions/get-categories'
import { CategoryList } from './_components/category/category-list'
import { ProductList } from './_components/product/product-list'

export default async function Shop() {
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <BasePage>
      <div className="flex flex-col gap-14">
        <CategoryList categories={categories} />
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
