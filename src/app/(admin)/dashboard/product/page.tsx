import { getCategories } from '@/app/(shop)/_actions/get-categories'
import { getProducts } from '@/app/(shop)/_actions/get-products'
import { BasePage } from '@/components/base-page'

import { DataTableProducts } from '../../_components/data-table/tables/products-data-table'

export default async function DashboardProducts() {
  const allProducts = await getProducts({
    type: 'ALL',
  })
  const allCategories = await getCategories()

  return (
    <BasePage className="px-0" classNameTitle="px-8" title="Products">
      <DataTableProducts
        complementCategoryData={allCategories}
        data={allProducts}
      />
    </BasePage>
  )
}
