'use client'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { api } from '@/utils/api'
import { formatDate } from '@/utils/format-date'
import { formatPrice } from '@/utils/format-price'
import { formatPriceDiscount } from '@/utils/format-price-discount'

import { OrderPayload } from '../../_actions/get-oders'
import { OrderProductItem } from './order-product-item'

export function OrderItem({
  order,
  index,
}: {
  order: OrderPayload
  index: number
}) {
  const router = useRouter()
  async function handleCheckout() {
    const responseCheckout = await api('/order/checkout', {
      method: 'POST',
      body: JSON.stringify({
        orderId: order.id,
        products: order.orderItems.map((orderItem) => {
          return {
            id: orderItem.id,
            name: orderItem.product.name,
            price: formatPriceDiscount(orderItem.product),
            quantity: orderItem.quantity,
            photos: [orderItem.product.photoUrl] ?? undefined,
            description: orderItem.product.description ?? undefined,
          }
        }),
      }),
    })

    const checkout = await responseCheckout.json()

    return router.push(checkout.url)
  }

  return (
    <Accordion type="single" className="w-full" collapsible>
      <AccordionItem value={order.id}>
        <div className="gap-8 p-6 flex flex-col border-2 border-color-secondary rounded-xl">
          <AccordionTrigger className="outline-none">
            <div className="text-left flex-1 flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <Label className="text-lg font-semibold">Order number</Label>
                <span className="text-sm text-color-gray">#{index}</span>
              </div>
              <div className="max-md:hidden flex flex-col gap-2">
                <Label className="text-lg font-semibold">Status</Label>
                <span className="text-sm font-bold text-color-primary">
                  {order.status === 'WAITING_FOR_PAYMENT' ? 'Waiting' : 'Payed'}
                </span>
              </div>
              <div className="max-md:hidden flex flex-col gap-2">
                <Label className="text-lg font-semibold">Date</Label>
                <span className="text-sm text-color-gray">
                  {formatDate(order.createdAt)}
                </span>
              </div>
              {order.status === 'WAITING_FOR_PAYMENT' && (
                <div className="max-md:hidden flex flex-col gap-2">
                  <Label className="text-lg font-semibold">Pay</Label>
                  <span
                    onClick={handleCheckout}
                    className="text-sm text-color-gray underline"
                  >
                    Go to payment
                  </span>
                </div>
              )}
              <div className="hover:bg-transparent cursor-pointer flex gap-2 items-center">
                <ChevronDown className="w-5 h-5 text-color-primary" />
                <span className="text-sm font-bold text-color-primary">
                  View details
                </span>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className={'flex flex-col gap-8'}>
            <Separator className="md:hidden" />
            <div className="md:hidden flex justify-between">
              <div className="flex flex-col gap-2">
                <Label className="text-lg font-semibold">Status</Label>
                <span className="text-sm font-bold text-color-primary">
                  {order.status === 'WAITING_FOR_PAYMENT' ? 'Waiting' : 'Payed'}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-lg font-semibold">Date</Label>
                <span className="text-sm text-color-gray">
                  {formatDate(order.createdAt)}
                </span>
              </div>
              {order.status === 'WAITING_FOR_PAYMENT' && (
                <div className="flex flex-col gap-2">
                  <Label className="text-lg font-semibold">Pay</Label>
                  <span
                    onClick={handleCheckout}
                    className="text-sm text-color-gray underline"
                  >
                    Go to payment
                  </span>
                </div>
              )}
            </div>
            <Separator />
            {order.orderItems.map((orderItem) => {
              return (
                <OrderProductItem key={orderItem.id} orderItem={orderItem} />
              )
            })}
            <div className="flex flex-col gap-4">
              {Number(order.subtotalPrice) > 0 &&
                Number(order.totalDiscounts) > 0 && (
                  <>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-color-gray">Subtotal</span>
                      <span className="text-sm text-color-gray">
                        {formatPrice(order.subtotalPrice)}
                      </span>
                    </div>
                  </>
                )}
              {Number(order.totalDiscounts) > 0 && (
                <>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-color-gray">Discounts</span>
                    <span className="text-sm text-color-gray">
                      {formatPrice(order.totalDiscounts)}
                    </span>
                  </div>
                </>
              )}
              {Number(order.totalPrice) > 0 && (
                <>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <Label className="font-semibold text-base">Total</Label>
                    <h1 className="font-semibold text-base">
                      {formatPrice(order.totalPrice)}
                    </h1>
                  </div>
                </>
              )}
            </div>
          </AccordionContent>
        </div>
      </AccordionItem>
    </Accordion>
  )
}
