import {
  LayoutList,
  LogIn,
  LogOut,
  Settings,
  ShoppingCart,
  Store,
  UserRoundPlus,
} from 'lucide-react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import React, { ReactNode } from 'react'

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
import { getUserPermissions } from '@/utils/get-user-permissions'

import { DropDownLogOut } from './logout-drop-down'
import { MainPageDropDown } from './main-page-drop-down'

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
        {data?.user ? (
          <React.Fragment>
            <DropdownMenuItem>
              <Link href={'/'} className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage src={data.user.image!} alt={data.user.name!} />
                  <AvatarFallback>{data.user.name![0][0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-medium text-base">{data.user.name}</h1>
                  <span className="text-color-gray text-sm">
                    {data.user.email}
                  </span>
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <MainPageDropDown permission={permission} />
              <DropdownMenuItem>
                <Link href={'/cart'} className="flex gap-3 items-center w-full">
                  <ShoppingCart className="w-5 h-5" />
                  My cart
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={'/category'}
                  className="flex gap-3 items-center w-full"
                >
                  <LayoutList className="w-5 h-5" />
                  Categories
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={'/settings'} className="flex gap-3 items-center">
                  <Settings className="w-5 h-5" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DropDownLogOut className="flex gap-3 items-center">
                <LogOut className="w-5 h-5" />
                Log out
              </DropDownLogOut>
            </DropdownMenuItem>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={'/'} className="flex gap-3 items-center w-full">
                  <Store className="w-5 h-5" />
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={'/cart'} className="flex gap-3 items-center w-full">
                  <ShoppingCart className="w-5 h-5" />
                  My cart
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={'/category'}
                  className="flex gap-3 items-center w-full"
                >
                  <LayoutList className="w-5 h-5" />
                  Categories
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={'/signin'} className="flex gap-3 items-center w-full">
                <LogIn className="w-5 h-5" />
                Sign In
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/signup'} className="flex gap-3 items-center w-full">
                <UserRoundPlus className="w-5 h-5" />
                Sign Up
              </Link>
            </DropdownMenuItem>
          </React.Fragment>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
