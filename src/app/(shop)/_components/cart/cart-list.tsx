import { Label } from '@/components/ui/label'
import { useCart } from '@/context/cart'

import { CartItem } from './cart-item'

export function CartList() {
  const { cart } = useCart()
  return (
    <div className="flex flex-col gap-5 overflow-auto">
      {cart.length > 0 ? (
        cart.map((product) => {
          return <CartItem key={product.id} product={product} />
        })
      ) : (
        <Label className="text-base">Your shopping cart is empty</Label>
      )}
    </div>
  )
}
