import { BasePage } from '@/components/base-page'

import { getProducts } from '../../../../actions/get-products'
import { ProductList } from '../../_components/product/product-list'

export default async function Category({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const productsByCategorySlug = await getProducts({
    type: 'CATEGORY',
    categorySlug: slug,
  })
  return (
    <BasePage title={slug[0].toUpperCase() + slug.slice(1)}>
      <div className="flex flex-col gap-14">
        <ProductList products={productsByCategorySlug} />
      </div>
    </BasePage>
  )
}
