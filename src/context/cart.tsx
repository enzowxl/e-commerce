'use client'

import { Product } from '@prisma/client'
import React, { createContext, ReactNode, useContext, useEffect } from 'react'

interface CartProduct extends Product {
  quantity: number
}

interface CartContext {
  cart: CartProduct[]
  addProductToCart: ({ product }: { product: Product }) => void
  removeProductFromCart: (slug: string) => void
  removeOneProductFromCart: (slug: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContext>({
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  removeOneProductFromCart: () => {},
  clearCart: () => {},
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, updateCart] = React.useState<CartProduct[]>([])

  useEffect(() => {
    const cartInLocalStorage = localStorage.getItem('cart')
    if (cartInLocalStorage) {
      updateCart(JSON.parse(cartInLocalStorage))
    } else {
      localStorage.setItem('cart', JSON.stringify([]))
    }
  }, [])

  function addProductToCart({ product }: { product: Product }) {
    const cartInLocalStorage: CartProduct[] = JSON.parse(
      localStorage.getItem('cart') || '[]',
    )

    const productIndex = cartInLocalStorage.findIndex(
      (cartProduct) => cartProduct.slug === product.slug,
    )

    if (productIndex !== -1) {
      cartInLocalStorage[productIndex].quantity += 1
    } else {
      cartInLocalStorage.push({ ...product, quantity: 1 })
    }

    return localStorage.setItem('cart', JSON.stringify(cartInLocalStorage))
  }

  function removeProductFromCart(slug: string) {
    const cartInLocalStorage: CartProduct[] = JSON.parse(
      localStorage.getItem('cart') || '[]',
    )

    const updatedCart = cartInLocalStorage.filter(
      (cartProduct) => cartProduct.slug !== slug,
    )

    return localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  function removeOneProductFromCart(slug: string) {
    const cartInLocalStorage: CartProduct[] = JSON.parse(
      localStorage.getItem('cart') || '[]',
    )

    const productIndex = cartInLocalStorage.findIndex(
      (cartProduct) => cartProduct.slug === slug,
    )

    if (productIndex !== -1) {
      if (cartInLocalStorage[productIndex].quantity > 1) {
        cartInLocalStorage[productIndex].quantity -= 1
      } else {
        cartInLocalStorage.splice(productIndex, 1)
      }
    }

    return localStorage.setItem('cart', JSON.stringify(cartInLocalStorage))
  }

  function clearCart() {
    localStorage.clear()
    return updateCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductToCart,
        removeProductFromCart,
        removeOneProductFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
