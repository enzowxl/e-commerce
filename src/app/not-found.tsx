import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { NotFoundSvg } from '@/components/svg/not-found'

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center gap-5 text-center">
      <NotFoundSvg />
      <div className="flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-3 items-center">
          <h1 className="font-bold text-4xl">Page not found</h1>
          <span className="text-color-gray">
            {"Oops, it looks like this page doesn't exist!"}
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
