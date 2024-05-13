import Link from 'next/link'

import { getProducts } from '@/actions/get-products'
import { BasePage } from '@/components/base-page'

export default async function Shop() {
  const products = await getProducts()

  return (
    <BasePage title="Shop">
      <div>
        {products.map((product) => {
          return (
            <Link href={`/product/${product.slug}`} key={product.id}>
              {product.name}
            </Link>
          )
        })}
      </div>
    </BasePage>
  )
}
