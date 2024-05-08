import '../globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { SideBar } from '@/app/(admin)/_components/sidebar'
import { Header } from '@/components/header/header'
import { SessionProvider } from '@/providers/session'
import { authOptions } from '@/utils/auth-options'
import { getUserPermissions } from '@/utils/get-user-permissions'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | dashboard',
    default: 'dashboard',
  },
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const data = await getServerSession(authOptions)

  const { cannot } = await getUserPermissions(data?.user?.sub as string)

  if (cannot('manage', 'all')) {
    return redirect('/')
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <div className="min-h-screen w-full flex flex-col">
            <Header isDashboard />
            <div className="flex-1 flex">
              <SideBar />
              <div className="flex-1 flex p-8">{children}</div>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
