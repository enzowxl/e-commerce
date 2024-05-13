'use client'

import { Product } from '@prisma/client'
import React, { createContext, ReactNode, useContext } from 'react'

interface CartProduct extends Product {
  quantity: number
}

interface CartContext {
  cart: CartProduct[]
  addProductToCart: ({ product }: { product: CartProduct }) => void
  removeProductFromCart: (slug: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContext>({
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, updateCart] = React.useState<CartProduct[]>([])

  function addProductToCart({ product }: { product: CartProduct }) {
    const productExistsInCart = cart.find(
      (cartProduct) => cartProduct.slug === product.slug,
    )

    if (productExistsInCart) {
      return updateCart((products) =>
        products.map((cartProduct) => {
          if (cartProduct.slug === product.slug) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + 1,
            }
          }
          return cartProduct
        }),
      )
    }

    updateCart((old) => [...old, product])
  }

  function removeProductFromCart(slug: string) {
    return updateCart((products) =>
      products.filter((cartProduct) => cartProduct.slug !== slug),
    )
  }

  function clearCart() {
    updateCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductToCart,
        removeProductFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
