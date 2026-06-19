'use client'
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { CartItem, PlayerData, StoreProduct } from '@/lib/types'

interface StoreContextType {
  player: PlayerData | null
  setPlayer: (p: PlayerData | null) => void
  logout: () => void
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  itemInCart: (id: string) => boolean
  cartTotal: number
  cartCount: number
}

const StoreContext = createContext<StoreContextType>({} as StoreContextType)

export function useStore() { return useContext(StoreContext) }

export function StoreProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<PlayerData | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('endwar_player')
    if (saved) try { setPlayer(JSON.parse(saved)) } catch {}
    const cartSaved = localStorage.getItem('endwar_cart')
    if (cartSaved) try { setCart(JSON.parse(cartSaved)) } catch {}
  }, [])

  useEffect(() => { if (player) localStorage.setItem('endwar_player', JSON.stringify(player)); else localStorage.removeItem('endwar_player') }, [player])
  useEffect(() => { localStorage.setItem('endwar_cart', JSON.stringify(cart)) }, [cart])

  const logout = useCallback(() => { setPlayer(null); localStorage.removeItem('endwar_player') }, [])
  const addToCart = useCallback((item: CartItem) => {
    setCart(p => {
      const existing = p.find(i => i.id === item.id)
      if (existing) {
        if (item.product?.category === 'rank') return p
        return p.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)
      }
      return [...p, { ...item, quantity: item.product?.category === 'rank' ? 1 : item.quantity }]
    })
  }, [])
  const removeFromCart = useCallback((id: string) => setCart(p => p.filter(i => i.id !== id)), [])
  const updateQuantity = useCallback((id: string, qty: number) => {
    if (qty <= 0) return removeFromCart(id)
    setCart(p => p.map(i => i.id === id ? { ...i, quantity: qty } : i))
  }, [removeFromCart])
  const clearCart = useCallback(() => setCart([]), [])
  const itemInCart = useCallback((id: string) => cart.some(i => i.id === id), [cart])
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <StoreContext.Provider value={{
      player, setPlayer, logout, cart, addToCart, removeFromCart, updateQuantity, clearCart, itemInCart,
      cartTotal, cartCount,
    }}>
      {children}
    </StoreContext.Provider>
  )
}
