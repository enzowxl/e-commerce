import { CircleUserRound, Menu, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

import { CartSheet } from '@/app/(shop)/_components/cart/cart-sheet'

import { UserDropDown } from './drop-down/user-drop-down'
import { MenuSheet } from './menu-sheet'
import { SearchForm } from './search-form'

export function Header({ isDashboard }: { isDashboard?: boolean }) {
  return (
    <header className="flex items-center justify-between px-8 py-8 border-b border-zinc-900">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-2xl font-extrabold text-white">
          myshop
        </Link>

        {!isDashboard && <SearchForm />}
      </div>
      <div className="max-sm:hidden flex gap-7">
        {!isDashboard && (
          <CartSheet>
            <ShoppingCart className="min-w-5 min-h-5 cursor-pointer" />
          </CartSheet>
        )}
        <UserDropDown>
          <CircleUserRound className="min-w-5 min-h-5 cursor-pointer" />
        </UserDropDown>
      </div>
      <div className="sm:hidden">
        <MenuSheet>
          <Menu className="min-w-5 min-h-5 cursor-pointer" />
        </MenuSheet>
      </div>
    </header>
  )
}
