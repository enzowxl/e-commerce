import '../globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Header } from '@/components/header/header'
import { SessionProvider } from '@/providers/session'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <div className="min-h-screen w-full flex flex-col">
            <Header />
            <div className="flex-1 flex p-8">{children}</div>
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
