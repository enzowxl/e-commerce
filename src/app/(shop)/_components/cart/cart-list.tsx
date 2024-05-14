import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/context/cart'

import { CartItem } from './cart-item'

export function CartList() {
  const { cart } = useCart()
  return (
    <div className="flex flex-col overflow-auto">
      {cart.length > 0 ? (
        cart.map((product, index) => {
          return (
            <div key={product.id}>
              <CartItem product={product} />
              {cart.length - 1 !== index && <Separator className="my-4" />}
            </div>
          )
        })
      ) : (
        <Label className="text-base">Your shopping cart is empty</Label>
      )}
    </div>
  )
}
