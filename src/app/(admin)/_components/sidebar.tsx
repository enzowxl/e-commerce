import { LayoutList, ShoppingBasket, UsersRound } from 'lucide-react'
import Link from 'next/link'

export function SideBar() {
  const pagesInSideBar = [
    {
      id: 1,
      name: 'Products',
      href: '/dashboard/product',
      icon: ShoppingBasket,
    },
    {
      id: 2,
      name: 'Categories',
      href: '/dashboard/category',
      icon: LayoutList,
    },
    {
      id: 3,
      name: 'Users',
      href: '/dashboard/user',
      icon: UsersRound,
    },
  ]

  return (
    <aside className="z-40 flex-1 max-sm:hidden px-8 py-8 border-r border-zinc-900">
      <div className="h-full overflow-y-auto">
        <ul className="space-y-4 font-medium">
          {pagesInSideBar?.map((page) => {
            return (
              <li
                className="text-white px-5 py-2 relative flex cursor-pointer select-none items-center rounded-sm text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full"
                key={page.id}
              >
                <Link
                  href={page.href}
                  className={'flex gap-3 items-center w-full'}
                >
                  <page.icon className="w-5 h-5" />
                  {page.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
