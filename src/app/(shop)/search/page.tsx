import { redirect } from 'next/navigation'

import { BasePage } from '@/components/base-page'

// import { getProducts } from '../_actions/get-products'
// import { ProductList } from '../_components/product/product-list'

export default async function Search({
  searchParams: { q },
}: {
  searchParams: { q: string }
}) {
  if (!q) {
    return redirect('/')
  }

  // const productsByQuery = await getProducts({ type: 'QUERY', query: q })

  return (
    <BasePage title={`Results for: ${q}`}>
      <div className="flex flex-col gap-14">
        {/* <ProductList products={productsByQuery} /> */}
      </div>
    </BasePage>
  )
}
