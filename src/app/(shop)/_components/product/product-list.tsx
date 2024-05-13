import { Product } from '@prisma/client'

import { ProductItem } from './product-item'

export function ProductList({ products }: { products: Product[] }) {
  if (!products) return
  return (
    <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5 w-full">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}
