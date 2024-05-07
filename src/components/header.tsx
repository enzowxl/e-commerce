import {
  CircleUserRound,
  LayoutList,
  Menu,
  Search,
  ShoppingCart,
} from 'lucide-react'
import Link from 'next/link'

import { MenuSheet } from './menu-sheet'
import { UserDropDown } from './user-drop-down'

export function Header({ isDashboard }: { isDashboard?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-2xl font-extrabold text-white">
          shop.dev
        </Link>

        {!isDashboard && (
          <form className="max-sm:hidden flex w-full items-center gap-3 rounded-xl bg-zinc-900 px-5 py-3">
            <Search className="w-5 h-5 text-zinc-500" />

            <input
              name="q"
              type="text"
              placeholder="Search products"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              required
            />
          </form>
        )}
      </div>
      <div className="max-sm:hidden flex gap-7">
        <Link href={'/category'}>
          <LayoutList className="min-w-5 min-h-5 cursor-pointer" />
        </Link>
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
