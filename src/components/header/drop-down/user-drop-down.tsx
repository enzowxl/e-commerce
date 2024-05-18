import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import React, { ReactNode } from 'react'

import { getUserPermissions } from '@/actions/get-user-permissions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { authOptions } from '@/utils/auth-options'

import { pages } from '../pagesData'
import { DropDownLogOut } from './logout-drop-down'

export async function UserDropDown({ children }: { children: ReactNode }) {
  const data = await getServerSession(authOptions)
  let permission: boolean = false

  if (data) {
    const { can } = await getUserPermissions(data?.user?.sub as string)
    permission = can('manage', 'all')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56">
        {data?.user && (
          <React.Fragment>
            <Link href={'/settings'}>
              <DropdownMenuItem className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage
                    src={data?.user.image as string}
                    alt={data?.user.name as string}
                  />
                  <AvatarFallback>{data?.user.name![0][0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-medium text-base">{data?.user.name}</h1>
                  <span className="text-color-gray text-sm">
                    {data?.user.email}
                  </span>
                </div>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </React.Fragment>
        )}
        <DropdownMenuGroup>
          {pages.map((page) => {
            if (!data && page.logged) return null

            if (data && !page.logged && page.name !== 'Home') return null

            if (data && page.admin && !permission) return null

            return (
              <React.Fragment key={page.id}>
                {page.name === 'Sign In' && <DropdownMenuSeparator />}
                <Link
                  href={page.href as string}
                  className="flex gap-3 items-center w-full"
                >
                  <DropdownMenuItem className="flex gap-3 items-center w-full">
                    <page.icon className="w-5 h-5" />
                    {page.name}
                  </DropdownMenuItem>
                </Link>
              </React.Fragment>
            )
          })}
        </DropdownMenuGroup>
        {data?.user && (
          <React.Fragment>
            <DropdownMenuSeparator />
            <DropDownLogOut className="w-full">
              <DropdownMenuItem className="flex gap-3 items-center w-full">
                <LogOut className="w-5 h-5" />
                Log out
              </DropdownMenuItem>
            </DropDownLogOut>
          </React.Fragment>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
