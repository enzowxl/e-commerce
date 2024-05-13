'use client'

import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { ErrorSvg } from '@/components/svg/error-svg'

export default function Error() {
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center gap-5 text-center">
      <ErrorSvg />
      <div className="flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-3 items-center">
          <h1 className="font-bold text-4xl">Oops!</h1>
          <span className="text-color-gray">
            It looks like there was an error. We are resolving this. Thank you
            for understanding.
          </span>
        </div>
        <Link
          className="bg-color-primary text-white h-12 rounded-xl flex gap-2 items-center px-4"
          href={'/'}
        >
          <ChevronLeft />
          Go home
        </Link>
      </div>
    </div>
  )
}
