import { CircleX, LogOut } from 'lucide-react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'

import { getUserPermissions } from '@/actions/get-user-permissions'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { authOptions } from '@/utils/auth-options'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { DropDownLogOut } from './drop-down/logout-drop-down'
import { dashboardPages, pages } from './pagesData'

export async function MenuSheet({ children }: { children: ReactNode }) {
  const data = await getServerSession(authOptions)

  let permission: boolean = false

  if (data) {
    const { can } = await getUserPermissions(data?.user?.sub as string)
    permission = can('manage', 'all')
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="outline-none flex flex-col gap-10" side={'left'}>
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold text-white">
            mydevshop
          </Link>
          <SheetClose className="outline-none">
            <CircleX className="min-w-5 min-h-5 cursor-pointer" />
          </SheetClose>
        </div>
        <div className="flex-1 flex flex-col gap-4 justify-between">
          <div className="flex flex-col gap-10">
            <ul className="space-y-4 font-medium">
              {data?.user && (
                <li className="text-white px-5 py-2 relative flex cursor-pointer select-none items-center rounded-sm text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full">
                  <Link href={'/settings'}>
                    <div className="flex gap-3 items-center">
                      <Avatar>
                        <AvatarImage
                          src={data?.user?.image as string}
                          alt={data?.user?.name as string}
                        />
                        <AvatarFallback>
                          {data?.user.name![0][0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h1 className="font-medium text-sm">
                          {data?.user.name}
                        </h1>
                        <span className="text-color-gray text-xs">
                          {data?.user.email}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              )}
              {pages?.map((page) => {
                if (!data && page.logged) return null

                if (data && !page.logged && page.name !== 'Home') return null

                if (data && page.admin && !permission) return null

                return (
                  <li
                    className="text-white px-5 py-2 relative flex cursor-pointer select-none items-center rounded-sm text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full"
                    key={page.id}
                  >
                    <Link
                      href={page.href as string}
                      className={'flex gap-3 items-center w-full'}
                    >
                      <page.icon className="w-5 h-5" />
                      {page.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <ul className="space-y-4 font-medium">
              {dashboardPages?.map((page) => {
                if (!permission) return null

                return (
                  <li
                    className="text-white px-5 py-2 relative flex cursor-pointer select-none items-center rounded-sm text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full"
                    key={page.id}
                  >
                    <Link
                      href={page.href as string}
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
          {data?.user && (
            <ul>
              <li className="text-white px-5 py-2 relative flex cursor-pointer select-none items-center rounded-sm text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full">
                <DropDownLogOut className="w-full">
                  <div className="flex gap-3 items-center w-full">
                    <LogOut className="w-5 h-5" />
                    Log out
                  </div>
                </DropDownLogOut>
              </li>
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
