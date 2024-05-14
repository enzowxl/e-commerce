import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { BasePage } from '@/components/base-page'
import { authOptions } from '@/utils/auth-options'

import { getOrders } from '../_actions/get-oders'

export default async function Order() {
  const data = await getServerSession(authOptions)

  if (!data) {
    return notFound()
  }

  const orders = await getOrders()

  console.log(orders)

  return <BasePage title="My orders">opa</BasePage>
}
