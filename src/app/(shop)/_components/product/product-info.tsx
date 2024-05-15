'use client'
import { Product } from '@prisma/client'
import { ArrowDown, Minus, Plus } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useCart } from '@/context/cart'
import { formatPrice } from '@/utils/format-price'
import { formatPriceDiscount } from '@/utils/format-price-discount'
export function ProductInfo({ product }: { product: Product }) {
  const { addProductToCart } = useCart()

  const [quantity, updateQuantity] = React.useState(1)

  function incrementProduct() {
    updateQuantity(quantity + 1)
  }

  function decrementProduct() {
    if (quantity > 1) {
      updateQuantity(quantity - 1)
    }
  }

  return (
    <div className="flex flex-col gap-8 sm:pt-4 ">
      <div className="flex gap-5 items-center">
        <span className="text-2xl">{product.name}</span>
        {product.discount > 0 && (
          <div className="flex items-center gap-1 px-1.5 bg-red-600 rounded-xl">
            <ArrowDown className="w-4 h-4" />
            <span className="text-sm">{product.discount}%</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {product.discount > 0 && (
          <span className="text-base text-color-gray line-through">
            {formatPrice(Number(product.price) * quantity)}
          </span>
        )}
        {product.discount > 0 ? (
          <h1 className="font-semibold text-3xl">
            {formatPrice(formatPriceDiscount(product) * quantity)}
          </h1>
        ) : (
          <h1 className="font-semibold text-3xl">
            {formatPrice(Number(product.price) * quantity)}
          </h1>
        )}
        <div className="flex items-center gap-2">
          <Button
            onClick={decrementProduct}
            className="rounded-xl px-1.5 bg-color-primary text-white"
          >
            <Minus className="w-5 h-5" />
          </Button>
          <span>{quantity}</span>
          <Button
            onClick={incrementProduct}
            className="rounded-xl px-1.5 bg-color-primary text-white"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div>
        <Label className="text-base">Description</Label>
        <p className="text-color-gray text-sm">
          {product.description ?? "Don't have"}
        </p>
      </div>
      <Button
        onClick={() =>
          addProductToCart({
            product: {
              ...product,
              quantity,
            },
          })
        }
        className="bg-color-primary text-white h-12 rounded-xl flex gap-2"
      >
        Add to cart
      </Button>
    </div>
  )
}
