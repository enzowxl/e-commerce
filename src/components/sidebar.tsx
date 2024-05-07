import { LayoutDashboard, LayoutList, ShoppingBasket } from 'lucide-react'
import Link from 'next/link'

export function SideBar() {
  const pages = [
    {
      id: 1,
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 2,
      name: 'Products',
      href: '/dashboard/product',
      icon: ShoppingBasket,
    },
    {
      id: 3,
      name: 'Categories',
      href: '/dashboard/category',
      icon: LayoutList,
    },
  ]

  return (
    <aside className="z-40 max-w-44 flex-1 max-sm:hidden">
      <div className="h-fulloverflow-y-auto">
        <ul className="space-y-4 font-medium">
          {pages.map((page) => {
            return (
              <li key={page.id}>
                <Link
                  href={page.href}
                  className="flex gap-3 items-center p-2 rounded-xl dark:text-white hover:bg-zinc-900"
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
