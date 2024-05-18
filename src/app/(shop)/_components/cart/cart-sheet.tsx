'use client'

import { Order } from '@prisma/client'
import { CircleX } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useCart } from '@/context/cart'
import { api } from '@/utils/api'
import { formatPrice } from '@/utils/format-price'
import { formatPriceDiscount } from '@/utils/format-price-discount'

import { getMe } from '../../_actions/get-me'
import { CartList } from './cart-list'

export function CartSheet({ children }: { children: ReactNode }) {
  const router = useRouter()

  const [open, updateOnOpenChange] = React.useState(false)

  const { cart, totalPrice, subtotalPrice, totalDiscounts, clearCart } =
    useCart()

  const { data } = useSession()

  async function finishOrder() {
    if (!data?.user) {
      router.push('/signin')
      return updateOnOpenChange(!open)
    }

    const me = await getMe(data?.user.email as string)

    if (!me?.address) {
      router.push('/settings')
      updateOnOpenChange(!open)
      return toast.error('Please fill in your details before making a purchase')
    }

    if (cart?.length === 0) return

    const responseOrder = await api('/order', {
      method: 'POST',
      body: JSON.stringify({
        totalPrice,
        subtotalPrice,
        totalDiscounts,
        products: cart?.map((product) => {
          return {
            id: product.id,
            price: Number(product.price),
            quantity: product.quantity,
            discount: product.discount,
            size: product.size,
            color: product.color,
          }
        }),
      }),
    })

    const { order } = (await responseOrder.json()) as { order: Order }

    const responseCheckout = await api('/order/checkout', {
      method: 'POST',
      body: JSON.stringify({
        orderId: order.id,
        products: cart?.map((product) => {
          return {
            id: product.id,
            name: product.name,
            price: formatPriceDiscount(product),
            quantity: product.quantity,
            photos: [product.photoUrl] ?? undefined,
            description: product.description ?? undefined,
          }
        }),
      }),
    })

    const checkout = await responseCheckout.json()

    updateOnOpenChange(!open)

    clearCart()

    return router.push(checkout.url)
  }

  return (
    <Sheet open={open} onOpenChange={updateOnOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="outline-none flex flex-col gap-10" side={'left'}>
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold text-white">
            myshop
          </Link>
          <SheetClose className="outline-none">
            <CircleX className="min-w-5 min-h-5 cursor-pointer" />
          </SheetClose>
        </div>
        <div className="flex-1 flex flex-col gap-4 justify-between">
          <div className="flex flex-col gap-4">
            <Label className="text-lg font-semibold leading-none tracking-tight pb-5">
              My cart
            </Label>
            <CartList />
            {subtotalPrice > 0 && totalDiscounts > 0 && (
              <>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-color-gray">Subtotal</span>
                  <span className="text-sm text-color-gray">
                    {formatPrice(subtotalPrice)}
                  </span>
                </div>
              </>
            )}
            {totalDiscounts > 0 && (
              <>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-color-gray">Discounts</span>
                  <span className="text-sm text-color-gray">
                    {formatPrice(totalDiscounts)}
                  </span>
                </div>
              </>
            )}
            {totalPrice > 0 && (
              <>
                <Separator />
                <div className="flex justify-between items-center">
                  <Label className="font-semibold text-base">Total</Label>
                  <h1 className="font-semibold text-base">
                    {formatPrice(totalPrice)}
                  </h1>
                </div>
              </>
            )}
          </div>
          {cart.length > 0 && (
            <Button
              onClick={finishOrder}
              className="bg-color-primary text-white h-12 rounded-xl flex gap-2"
            >
              Finish order
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
