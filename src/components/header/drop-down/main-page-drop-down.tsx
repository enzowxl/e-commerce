'use client'

import { LayoutDashboard, Store } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { DropdownMenuItem } from '../../ui/dropdown-menu'

export function MainPageDropDown({ permission }: { permission: boolean }) {
  const pathname = usePathname()

  return (
    <React.Fragment>
      {!pathname.includes('dashboard') && permission ? (
        <DropdownMenuItem>
          <Link href={'/dashboard'} className="flex gap-3 items-center">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem>
          <Link href={'/'} className="flex gap-3 items-center w-full">
            <Store className="w-5 h-5" />
            Home
          </Link>
        </DropdownMenuItem>
      )}
    </React.Fragment>
  )
}
