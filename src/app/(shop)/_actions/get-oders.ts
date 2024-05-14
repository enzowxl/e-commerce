import { Order } from '@prisma/client'
import { headers } from 'next/headers'

import { api } from '@/utils/api'

export async function getOrders(): Promise<Order[]> {
  const response = await api(`/order`, {
    method: 'GET',
    cache: 'no-cache',
    headers: headers(),
  })

  const order = (await response.json()) as Order[]

  return order
}
