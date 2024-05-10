import { getCategories } from '@/actions/get-categories'
import { getProducts } from '@/actions/get-products'
import { BasePage } from '@/components/base-page'

import { DataTableProducts } from '../../_components/data-table/tables/products-data-table'

export default async function DashboardProducts() {
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <BasePage className="px-0" classNameTitle="px-8" title="Products">
      <DataTableProducts complementCategoryData={categories} data={products} />
    </BasePage>
  )
}
