'use client'

import { Product } from '@prisma/client'
import React, { createContext, ReactNode, useContext, useEffect } from 'react'

import { formatPriceDiscount } from '@/utils/format-price-discount'

export interface CartProduct extends Product {
  quantity: number
  size?: string
  color?: string
}

interface CartContext {
  cart: CartProduct[]
  addProductToCart: ({ product }: { product: Product }) => void
  removeProductFromCart: (slug: string) => void
  clearCart: () => void
  totalPrice: number
  subtotalPrice: number
  totalDiscounts: number
}

const CartContext = createContext<CartContext>({
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
  totalPrice: 0,
  subtotalPrice: 0,
  totalDiscounts: 0,
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

  const subtotalPrice = cart.reduce((acc, product) => {
    return acc + Number(product.price) * product.quantity
  }, 0)

  const totalPrice = cart.reduce((acc, product) => {
    return acc + formatPriceDiscount(product) * product.quantity
  }, 0)

  const totalDiscounts = subtotalPrice - totalPrice

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

    localStorage.setItem('cart', JSON.stringify(cartInLocalStorage))
    return updateCart(cartInLocalStorage)
  }

  function removeProductFromCart(slug: string) {
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

    localStorage.setItem('cart', JSON.stringify(cartInLocalStorage))
    return updateCart(cartInLocalStorage)
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
        clearCart,
        totalPrice,
        subtotalPrice,
        totalDiscounts,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
