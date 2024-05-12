import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { SideBar } from '@/app/(admin)/_components/sidebar'
import { Header } from '@/components/header/header'
import { authOptions } from '@/utils/auth-options'

export const metadata: Metadata = {
  title: {
    template: '%s | dashboard',
    default: 'dashboard',
  },
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const data = await getServerSession(authOptions)

  if (data?.user.role !== 'ADMIN') {
    return notFound()
  }
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header isDashboard />
      <div className="flex-1 flex">
        <SideBar />
        <div className="flex-1 flex">{children}</div>
      </div>
    </div>
  )
}
