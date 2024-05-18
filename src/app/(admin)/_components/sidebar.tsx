import Link from 'next/link'

import { dashboardPages } from '@/components/header/pagesData'

export function SideBar() {
  return (
    <aside className="z-40 flex-1 max-sm:hidden px-8 py-8 border-r border-zinc-900">
      <div className="h-full overflow-y-auto">
        <ul className="space-y-4 font-medium">
          {dashboardPages?.map((page) => {
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
