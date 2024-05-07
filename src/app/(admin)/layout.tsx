import '../globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Header } from '@/components/header'
import { SideBar } from '@/components/sidebar'
import { SessionProvider } from '@/providers/session'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | dashboard',
    default: 'dashboard',
  },
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <div className="min-h-screen w-full flex flex-col px-8 py-8 gap-12">
            <Header isDashboard />
            <div className="flex-1 flex gap-10">
              <SideBar />
              {children}
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
