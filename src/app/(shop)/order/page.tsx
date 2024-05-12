import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { BasePage } from '@/components/base-page'
import { authOptions } from '@/utils/auth-options'

export default async function Order() {
  const data = await getServerSession(authOptions)

  if (!data) {
    return redirect('/')
  }

  return <BasePage title="My orders">opa</BasePage>
}