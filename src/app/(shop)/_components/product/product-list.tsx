import { Product } from '@prisma/client'
import clsx from 'clsx'

import { ProductItem } from './product-item'

export function ProductList({
  products,
  title,
  classNameTitle,
}: {
  products: Product[]
  title?: string
  classNameTitle?: string
}) {
  return (
    <div className="flex flex-col gap-8">
      {title && (
        <h1 className={clsx('text-3xl font-bold text-white', classNameTitle)}>
          {title}
        </h1>
      )}

      <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5 w-full">
        {products?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
