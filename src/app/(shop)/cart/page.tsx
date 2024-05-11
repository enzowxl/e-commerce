import { Cart as CartType } from '@prisma/client'

import { BasePage } from '@/components/base-page'
import { api } from '@/utils/api'

async function getCart(): Promise<CartType> {
  const response = await api('/cart', {
    method: 'GET',
  })
  const { cart } = (await response.json()) as { cart: CartType }

  return cart
}

export default async function Cart() {
  const cart = await getCart()
  console.log(cart)
  return <BasePage title="My cart">opa</BasePage>
}
