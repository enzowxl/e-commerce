import type { Metadata } from 'next'

import { Header } from '@/components/header/header'

export const metadata: Metadata = {
  title: {
    template: '%s | devstore',
    default: 'devstore',
  },
}

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      <div className="flex-1 flex">{children}</div>
    </div>
  )
}
