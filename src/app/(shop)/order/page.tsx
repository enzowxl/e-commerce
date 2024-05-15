import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import React from 'react'

import { BasePage } from '@/components/base-page'
import { authOptions } from '@/utils/auth-options'

import { getOrders } from '../_actions/get-oders'
import { OrderItem } from '../_components/order/order-item'

export default async function Order() {
  const data = await getServerSession(authOptions)

  if (!data) {
    return notFound()
  }

  const orders = await getOrders()

  return (
    <BasePage title="My orders">
      <div className="flex flex-col gap-10">
        {orders.map((order, index) => {
          return <OrderItem key={order.id} order={order} index={index + 1} />
        })}
      </div>
    </BasePage>
  )
}
