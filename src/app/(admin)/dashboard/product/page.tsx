import { Product } from '@prisma/client'

import { BasePage } from '@/components/base-page'
import { api } from '@/utils/api'

import { DataTableProducts } from '../../_components/data-table/tables/products-data-table'

async function getProducts(): Promise<Product[]> {
  const response = await api('/product', {
    method: 'GET',
  })

  const { products } = (await response.json()) as { products: Product[] }

  return products
}

export default async function DashboardProducts() {
  const products = await getProducts()

  return (
    <BasePage className="px-0" classNameTitle="px-8" title="Products">
      <DataTableProducts data={products} />
    </BasePage>
  )
}
