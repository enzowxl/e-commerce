import { Product } from '@prisma/client'
import { Percent } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { formatPrice } from '@/utils/format-price'
import { formatPriceDiscount } from '@/utils/format-price-discount'

export function ProductItem({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="w-full rounded-xl overflow-hidden"
    >
      <div className="relative flex items-center justify-center bg-color-secondary rounded-xl h-72">
        {product.discount > 0 && (
          <div className="flex items-center gap-1 absolute top-4 left-4 px-3 bg-red-600 rounded-xl">
            <Percent className="w-3 h-3" />
            <span className="text-sm">{product.discount}</span>
          </div>
        )}
        <Image
          priority
          width={1000}
          height={1000}
          src={product.photoUrl ?? ''}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col gap-1 py-4">
        <span className="text-base">{product.name}</span>
        {product.discount > 0 && (
          <span className="text-sm text-color-gray line-through">
            {formatPrice(product.price)}
          </span>
        )}
        {product.discount > 0 ? (
          <h1 className="font-semibold text-2xl">
            {formatPrice(formatPriceDiscount(product))}
          </h1>
        ) : (
          <h1 className="font-semibold text-2xl">
            {formatPrice(product.price)}
          </h1>
        )}
      </div>
    </Link>
  )
}
