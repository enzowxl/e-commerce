import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { SideBar } from '@/app/(admin)/_components/sidebar'
import { Header } from '@/components/header/header'
import { authOptions } from '@/utils/auth-options'
import { getUserPermissions } from '@/utils/get-user-permissions'

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

  const { cannot } = await getUserPermissions(data?.user?.sub as string)

  if (cannot('manage', 'all')) {
    return redirect('/')
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
