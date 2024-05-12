import type { Metadata } from 'next'

import { Header } from '@/components/header/header'

import { HeaderPromotion } from './_components/header-promotions'

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
      <HeaderPromotion />
      <Header />
      <div className="w-full">{children}</div>
    </div>
  )
}
