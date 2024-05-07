'use client'
import { LayoutDashboard, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
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

export function UserDropDown({ children }: { children: ReactNode }) {
  const { data } = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56">
        {data?.user ? (
          <React.Fragment>
            <DropdownMenuItem>
              <Link href={'/'} className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-medium text-base">Enzo Almeida</h1>
                  <span className="text-gray-standard text-sm">
                    enzoalmeida34@gmail.com
                  </span>
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={'/'} className="flex gap-3 items-center">
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={'/'} className="flex gap-3 items-center">
                  <Settings className="w-5 h-5" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={'/'} className="flex gap-3 items-center">
                <LogOut className="w-5 h-5" />
                Log out
              </Link>
            </DropdownMenuItem>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <DropdownMenuItem>
              <Link href={'/'} className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-medium text-base">Enzo Almeida</h1>
                  <span className="text-gray-standard text-sm">
                    enzoalmeida34@gmail.com
                  </span>
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={'/dashboard'} className="flex gap-3 items-center">
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
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
              <Link href={'/'} className="flex gap-3 items-center">
                <LogOut className="w-5 h-5" />
                Log out
              </Link>
            </DropdownMenuItem>
          </React.Fragment>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
