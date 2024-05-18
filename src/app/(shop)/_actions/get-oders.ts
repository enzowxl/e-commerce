'use server'

import { Prisma } from '@prisma/client'
import { headers } from 'next/headers'

import { api } from '@/utils/api'

export interface OrderPayload
  extends Prisma.OrderGetPayload<{
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    }
  }> {}

export async function getOrders(): Promise<OrderPayload[]> {
  const response = await api(`/order`, {
    method: 'GET',
    cache: 'no-cache',
    headers: headers(),
  })

  const { orders } = (await response.json()) as { orders: OrderPayload[] }

  return orders
}
