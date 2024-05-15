import { Prisma } from '@prisma/client'
import { Label } from '@radix-ui/react-label'
import Image from 'next/image'

import { formatPrice } from '@/utils/format-price'
import { formatPriceDiscount } from '@/utils/format-price-discount'

export function OrderProductItem({
  orderItem,
}: {
  orderItem: Prisma.OrderItemGetPayload<{
    include: {
      product: true
    }
  }>
}) {
  return (
    <div className="flex justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20">
          <Image
            src={orderItem.product.photoUrl ?? ''}
            alt={orderItem.product.name}
            width={0}
            height={0}
            sizes="100vh"
            className="rounded-lg object-cover h-full w-full"
          />
        </div>
        <div className="flex flex-col sm:gap-2">
          <Label className="text-lg font-semibold">
            {orderItem.product.name}
          </Label>
          <span className="max-sm:hidden text-sm text-color-gray">
            Quantity - {orderItem.quantity}
          </span>
          <div className="sm:hidden flex flex-col gap-1">
            {orderItem.discount > 0 && (
              <span className="text-sm text-color-gray line-through">
                {formatPrice(Number(orderItem.price) * orderItem.quantity)}
              </span>
            )}
            {orderItem.discount > 0 ? (
              <h1 className="font-semibold text-lg">
                {formatPrice(
                  formatPriceDiscount(orderItem.product) * orderItem.quantity,
                )}
              </h1>
            ) : (
              <h1 className="font-semibold text-lg">
                {formatPrice(Number(orderItem.price) * orderItem.quantity)}
              </h1>
            )}
          </div>
        </div>
      </div>
      <div className="max-sm:hidden flex flex-col gap-1 pt-4">
        {orderItem.discount > 0 && (
          <span className="text-sm text-color-gray line-through">
            {formatPrice(Number(orderItem.price) * orderItem.quantity)}
          </span>
        )}
        {orderItem.discount > 0 ? (
          <h1 className="font-semibold text-lg">
            {formatPrice(
              formatPriceDiscount(orderItem.product) * orderItem.quantity,
            )}
          </h1>
        ) : (
          <h1 className="font-semibold text-lg">
            {formatPrice(Number(orderItem.price) * orderItem.quantity)}
          </h1>
        )}
      </div>
      <span className="sm:hidden text-sm text-color-gray">
        Qtd - {orderItem.quantity}
      </span>
    </div>
  )
}
