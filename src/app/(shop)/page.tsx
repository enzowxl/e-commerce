import { getProducts } from '@/app/(shop)/_actions/get-products'
import { BasePage } from '@/components/base-page'

import { getCategories } from './_actions/get-categories'
import { CategoryList } from './_components/category/category-list'
import { ProductList } from './_components/product/product-list'

export default async function Shop() {
  const categories = await getCategories()
  const products = await getProducts({
    type: 'ALL',
  })
  const offerProducts = await getProducts({ type: 'OFFER' })
  const gymProducts = await getProducts({
    type: 'CATEGORY',
    categorySlug: 'gym',
  })
  const casualProducts = await getProducts({
    type: 'CATEGORY',
    categorySlug: 'casual',
  })
  const electronicsProducts = await getProducts({
    type: 'CATEGORY',
    categorySlug: 'electronics',
  })

  return (
    <BasePage>
      <div className="flex flex-col gap-10">
        <CategoryList categories={categories} />
        <ProductList title="Offers" products={offerProducts} />
        <ProductList title="All" products={products} />
        <ProductList title="Gym" products={gymProducts} />
        <ProductList title="Casual" products={casualProducts} />
        <ProductList title="Electronics" products={electronicsProducts} />
      </div>
    </BasePage>
  )
}
