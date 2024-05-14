'use client'

import { CircleX } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useCart } from '@/context/cart'

import { CartList } from './cart-list'

export function CartSheet({ children }: { children: ReactNode }) {
  const { cart } = useCart()

  function finishOrder() {
    console.log(cart)
  }

  return (
    <Sheet>
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
          </div>
          <Button
            onClick={finishOrder}
            className="bg-color-primary text-white h-12 rounded-xl flex gap-2"
          >
            Finish order
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
