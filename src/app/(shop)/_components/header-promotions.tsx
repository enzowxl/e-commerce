'use client'

import { CircleX, Percent } from 'lucide-react'
import React from 'react'

export function HeaderPromotion() {
  const [closeHeader, updateCloseHeader] = React.useState(true)

  if (!closeHeader) return

  return (
    <header className="bg-black flex gap-3 items-center py-1.5 px-5">
      <div className="flex-1 flex gap-3 items-center justify-center">
        <Percent className="w-4 h-4" />
        <h1 className="font-medium text-sm">25% discount</h1>
      </div>
      <button onClick={() => updateCloseHeader(false)}>
        <CircleX className="w-4 h-4" />
      </button>
    </header>
  )
}
