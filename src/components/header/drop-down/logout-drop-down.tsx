'use client'

import { signOut } from 'next-auth/react'
import { ReactNode } from 'react'

import { env } from '@/env'

export function DropDownLogOut({
  children,
  className,
}: {
  children: ReactNode
  className: string
}) {
  return (
    <button
      className={className}
      onClick={() =>
        signOut({
          callbackUrl: env.NEXT_PUBLIC_URL,
          redirect: true,
        })
      }
    >
      {children}
    </button>
  )
}
