import { Category } from '@prisma/client'

import { BasePage } from '@/components/base-page'
import { api } from '@/utils/api'

import { DataTableCategories } from '../../_components/data-table/tables/categories-data-table'

async function getCategories(): Promise<Category[]> {
  const response = await api('/category', {
    method: 'GET',
  })

  const { categories } = (await response.json()) as { categories: Category[] }

  return categories
}

export default async function DashboardCategories() {
  const categories = await getCategories()

  return (
    <BasePage className="px-0" classNameTitle="px-5" title="Categories">
      <DataTableCategories data={categories} />
    </BasePage>
  )
}
