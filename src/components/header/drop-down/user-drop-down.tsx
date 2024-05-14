import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Package,
  Settings,
  Store,
  UserRoundPlus,
} from 'lucide-react'
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
              <DropdownMenuItem>
                <Link href={'/'} className="flex gap-3 items-center w-full">
                  <Store className="w-5 h-5" />
                  Home
                </Link>
              </DropdownMenuItem>
              {permission && (
                <DropdownMenuItem>
                  <Link
                    href={'/dashboard'}
                    className="flex gap-3 items-center w-full"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <Link
                  href={'/order'}
                  className="flex gap-3 items-center w-full"
                >
                  <Package className="w-5 h-5" />
                  My orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={'/settings'}
                  className="flex gap-3 items-center w-full"
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DropDownLogOut className="flex gap-3 items-center w-full">
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
