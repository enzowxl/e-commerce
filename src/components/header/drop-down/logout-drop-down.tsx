'use client'

import { signOut } from 'next-auth/react'
import { ReactNode } from 'react'

export function DropDownLogOut({
  children,
  className,
}: {
  children: ReactNode
  className: string
}) {
  return (
    <button className={className} onClick={() => signOut()}>
      {children}
    </button>
  )
}
