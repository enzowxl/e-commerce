import '../globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Header } from '@/components/header'
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
          <div className="grid px-10 py-8 gap-8">
            <Header />
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
