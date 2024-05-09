import { CircleUserRound, Menu, Search, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

import { Input } from '../ui/input'
import { UserDropDown } from './drop-down/user-drop-down'
import { MenuSheet } from './menu-sheet'

export function Header({ isDashboard }: { isDashboard?: boolean }) {
  return (
    <div className="flex items-center justify-between px-8 py-8 border-b border-zinc-900">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-2xl font-extrabold text-white">
          shop.dev
        </Link>

        {!isDashboard && (
          <form className="flex max-w-sm items-center gap-3 rounded-xl bg-zinc-900 px-5 h-12">
            <Search className="w-5 h-5 text-zinc-500" />

            <Input
              name="q"
              type="text"
              placeholder="Search products"
              required
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500 border-0"
            />
          </form>
        )}
      </div>
      <div className="max-sm:hidden flex gap-7">
        <Link href={'/cart'}>
          <ShoppingCart className="min-w-5 min-h-5 cursor-pointer" />
        </Link>
        <UserDropDown>
          <CircleUserRound className="min-w-5 min-h-5 cursor-pointer" />
        </UserDropDown>
      </div>
      <div className="sm:hidden">
        <MenuSheet>
          <Menu className="min-w-5 min-h-5 cursor-pointer" />
        </MenuSheet>
      </div>
    </div>
  )
}
