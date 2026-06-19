'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiMinus, HiPlus, HiTrash } from 'react-icons/hi'
import { useStore } from '@/app/providers'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, player } = useStore()
  const router = useRouter()

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 glass border-l border-end-500/20 shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-end-500/20">
                <h2 className="font-minecraft text-lg gradient-text">Cart ({cartCount})</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-all"><HiX className="text-xl" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p className="font-minecraft text-sm mb-2">Empty Cart</p>
                    <p className="text-xs">Add some items from the store!</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <motion.div key={item.id} layout className="glass rounded-lg p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-end-500/10 flex items-center justify-center text-lg">{item.name[0]}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-end-400 text-sm font-bold">₹{item.price * item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.product?.category === 'rank' ? (
                          <span className="text-xs text-gray-500">1x</span>
                        ) : (
                          <>
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-lg glass flex items-center justify-center text-xs hover:text-end-400 transition-all">
                              {item.quantity === 1 ? <HiTrash /> : <HiMinus />}
                            </button>
                            <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-lg glass flex items-center justify-center text-xs hover:text-end-400 transition-all">
                              <HiPlus />
                            </button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-end-500/20 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total:</span>
                    <span className="font-minecraft text-xl gradient-text">₹{cartTotal}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (!player) { router.push('/login'); onClose(); return }
                      router.push('/checkout'); onClose()
                    }}
                    className="w-full btn-primary py-3 rounded-lg font-medium text-sm">
                    {player ? 'Proceed to Checkout' : 'Login to Purchase'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
