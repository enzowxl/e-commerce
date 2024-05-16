import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { CartProduct, useCart } from '@/context/cart'
import { formatPrice } from '@/utils/format-price'
import { formatPriceDiscount } from '@/utils/format-price-discount'

export function CartItem({ product }: { product: CartProduct }) {
  const { addProductToCart, removeProductFromCart } = useCart()
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20">
          <Image
            src={product.photoUrl!}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vh"
            className="rounded-lg object-cover h-full w-full"
          />
        </div>
        <div className="flex flex-col gap-1 sm:pt-4">
          <span className="text-sm">{product.name}</span>
          {product.discount > 0 && (
            <span className="text-xs text-color-gray line-through">
              {formatPrice(Number(product.price) * product.quantity)}
            </span>
          )}
          {product.discount > 0 ? (
            <h1 className="max-sm:hidden font-semibold text-base">
              {formatPrice(formatPriceDiscount(product) * product.quantity)}
            </h1>
          ) : (
            <h1 className="max-sm:hidden font-semibold text-base">
              {formatPrice(Number(product.price) * product.quantity)}
            </h1>
          )}
          <div className="sm:hidden flex items-center gap-2">
            <Button
              onClick={() => removeProductFromCart(product.slug)}
              className="rounded-xl px-1.5 bg-color-primary text-white"
            >
              <Minus className="w-5 h-5" />
            </Button>
            <span>{product.quantity}</span>
            <Button
              onClick={() => addProductToCart({ product })}
              className="rounded-xl px-1.5 bg-color-primary text-white"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      <div>
        {product.discount > 0 && (
          <span className="sm:hidden text-xs text-color-gray line-through">
            {formatPrice(Number(product.price) * product.quantity)}
          </span>
        )}
        {product.discount > 0 ? (
          <h1 className="sm:hidden font-semibold text-base">
            {formatPrice(formatPriceDiscount(product) * product.quantity)}
          </h1>
        ) : (
          <h1 className="sm:hidden font-semibold text-base">
            {formatPrice(Number(product.price) * product.quantity)}
          </h1>
        )}
      </div>
      <div className="max-sm:hidden flex items-center gap-2">
        <Button
          onClick={() => removeProductFromCart(product.slug)}
          className="rounded-xl px-1.5 bg-color-primary text-white"
        >
          <Minus className="w-5 h-5" />
        </Button>
        <span>{product.quantity}</span>
        <Button
          onClick={() =>
            addProductToCart({
              product: {
                ...product,
                quantity: 1,
              },
            })
          }
          className="rounded-xl px-1.5 bg-color-primary text-white"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
