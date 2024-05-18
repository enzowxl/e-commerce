import './globals.css'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import { CartProvider } from '@/context/cart'
import { SessionProvider } from '@/providers/session'

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: {
    template: '%s | mydevshop',
    default: 'mydevshop',
  },
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvider>
          <CartProvider>
            <Toaster position="top-right" />
            {children}
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
