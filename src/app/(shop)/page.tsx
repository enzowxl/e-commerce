import { getProducts } from '@/app/(shop)/_actions/get-products'
import { BasePage } from '@/components/base-page'

import { getCategories } from './_actions/get-categories'
import { CategoryList } from './_components/category/category-list'
import { ProductList } from './_components/product/product-list'

export default async function Shop() {
  const allCategories = await getCategories()
  const allProducts = await getProducts({
    type: 'ALL',
  })
  const productsInOffer = await getProducts({ type: 'OFFER' })

  return (
    <BasePage>
      <div className="flex flex-col gap-10">
        {allCategories?.length > 0 && (
          <CategoryList categories={allCategories} />
        )}
        {productsInOffer?.length > 0 && (
          <ProductList title="Offers" products={productsInOffer} />
        )}
        {allProducts?.length > 0 && (
          <ProductList title="All" products={allProducts} />
        )}
        {allCategories.map(async (category) => {
          const productsByCategory = await getProducts({
            type: 'CATEGORY',
            categorySlug: category.slug,
          })
          if (productsByCategory.length > 0) {
            return (
              <ProductList
                key={category.id}
                title={category.name}
                products={productsByCategory}
              />
            )
          }
        })}
      </div>
    </BasePage>
  )
}
