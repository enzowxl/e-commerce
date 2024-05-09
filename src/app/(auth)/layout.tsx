import type { Metadata } from 'next'

import { AuthSvg } from './_components/auth-svg'

export const metadata: Metadata = {
  title: {
    template: '%s | auth',
    default: 'auth',
  },
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen w-full flex">
      <div className="max-lg:hidden flex items-center justify-center w-2/4 border-r px-12">
        <AuthSvg />
      </div>
      <div className="flex-1 flex items-center justify-center w-2/4 max-lg:w-full px-12">
        {children}
      </div>
    </div>
  )
}
