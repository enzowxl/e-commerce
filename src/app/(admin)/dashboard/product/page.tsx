import { getCategories } from '@/app/(shop)/_actions/get-categories'
import { getProducts } from '@/app/(shop)/_actions/get-products'
import { BasePage } from '@/components/base-page'

import { DataTableProducts } from '../../_components/data-table/tables/products-data-table'

export default async function DashboardProducts() {
  const products = await getProducts({
    type: 'ALL',
  })
  const categories = await getCategories()

  return (
    <BasePage className="px-0" classNameTitle="px-8" title="Products">
      <DataTableProducts complementCategoryData={categories} data={products} />
    </BasePage>
  )
}
