'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useStore } from '@/app/providers'
import { HiArrowLeft, HiCheck, HiExclamation } from 'react-icons/hi'
import { FaDiscord } from 'react-icons/fa'
import Link from 'next/link'

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount, clearCart, player } = useStore()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [order, setOrder] = useState<{ id: string; items: string; total: number } | null>(null)

  if (!player) {
    router.push('/login')
    return null
  }

  if (cart.length === 0 && !order) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="font-minecraft text-xl gradient-text mb-4">Cart is empty</p>
          <Link href="/store" className="btn-primary px-6 py-3 rounded-lg text-sm">Browse Store</Link>
        </div>
      </main>
    )
  }

  const handleBuyNow = async () => {
    setSubmitting(true)
    const orderData = {
      id: `END-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      player: player.username,
      uuid: player.uuid,
      items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
      total: cartTotal,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    try {
      await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })
    } catch {}

    setOrder({ id: orderData.id, items: cart.map(i => `${i.name} x${i.quantity}`).join(', '), total: cartTotal })
    clearCart()
    setSubmitting(false)
  }

  if (order) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full">
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
              <HiCheck className="text-4xl text-green-400" />
            </div>

            <h2 className="font-minecraft text-2xl gradient-text mb-2">Order Placed!</h2>
            <p className="text-gray-400 text-sm mb-6">Save this Order ID — you'll need it in Discord</p>

            <div className="glass rounded-lg p-4 mb-6">
              <p className="text-xs text-gray-500 mb-1">Order ID</p>
              <p className="font-minecraft text-lg text-end-300 break-all select-all">{order.id}</p>
            </div>

            <div className="glass rounded-lg p-4 mb-6 text-left text-sm">
              <p className="text-gray-500 text-xs mb-2">Items</p>
              <p className="text-gray-300">{order.items}</p>
              <div className="border-t border-end-500/10 mt-3 pt-3 flex justify-between">
                <span className="text-gray-500">Total</span>
                <span className="font-minecraft gradient-text">₹{order.total}</span>
              </div>
            </div>

            <div className="glass rounded-lg p-4 mb-6 text-left text-xs text-gray-400 flex items-start gap-2">
              <HiExclamation className="text-amber-400 mt-0.5 flex-shrink-0" />
              <p>Join our Discord, create a ticket, and paste this Order ID. Staff will assist you with payment and delivery.</p>
            </div>

            <a href="https://discord.gg/WZUr5TYn5g" target="_blank"
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] py-3 rounded-xl font-medium text-sm transition-all inline-flex items-center justify-center gap-2 mb-3">
              <FaDiscord /> Open Discord Ticket
            </a>
            <Link href="/store"
              className="block w-full glass py-3 rounded-xl text-sm hover:border-end-400 transition-all text-center">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/store" className="inline-flex items-center gap-2 text-gray-400 hover:text-end-400 text-sm transition-all mb-8">
            <HiArrowLeft /> Back to Store
          </Link>

          <h1 className="font-minecraft text-3xl gradient-text mb-8">Checkout</h1>

          <div className="glass-card rounded-2xl p-6 mb-6">
            <h2 className="font-minecraft text-sm text-end-300 mb-4">Cart Items ({cartCount})</h2>
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-end-500/10 flex items-center justify-center text-sm">
                      {item.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">x{item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-end-400 font-bold text-sm">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-end-500/10 mt-4 pt-4 flex justify-between items-center">
              <span className="text-gray-400">Total</span>
              <span className="font-minecraft text-xl gradient-text">₹{cartTotal}</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 mb-6">
            <h2 className="font-minecraft text-sm text-end-300 mb-4">Delivering to</h2>
            <div className="flex items-center gap-3">
              <img src={`https://mc-heads.net/avatar/${player.username}/32`} alt="" className="w-8 h-8 rounded-full" />
              <div>
                <p className="text-sm font-medium">{player.username}</p>
                <p className="text-xs text-gray-500">Items delivered in-game after payment</p>
              </div>
            </div>
          </div>

          <button onClick={handleBuyNow} disabled={submitting}
            className="w-full btn-primary py-4 rounded-xl font-medium text-sm disabled:opacity-50 transition-all">
            {submitting ? 'Processing...' : `Buy Now — ₹${cartTotal}`}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            After purchase, join Discord and create a ticket with your Order ID to complete payment
          </p>
        </motion.div>
      </div>
    </main>
  )
}
