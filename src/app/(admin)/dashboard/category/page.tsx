import { getCategories } from '@/actions/get-categories'
import { BasePage } from '@/components/base-page'

import { DataTableCategories } from '../../_components/data-table/tables/categories-data-table'

export default async function DashboardCategories() {
  const allCategories = await getCategories()

  return (
    <BasePage className="px-0" classNameTitle="px-8" title="Categories">
      <DataTableCategories data={allCategories} />
    </BasePage>
  )
}
