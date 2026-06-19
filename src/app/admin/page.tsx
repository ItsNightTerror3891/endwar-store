'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiLockClosed, HiSearch, HiCheck, HiClock, HiX, HiClipboardCopy } from 'react-icons/hi'
import { FaDiscord } from 'react-icons/fa'

export default function AdminPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState<any>(null)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState('')
  const [searching, setSearching] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleLogin = () => {
    if (username && password === 'endwar123') {
      setLoggedIn(true)
      setError('')
    } else {
      setError('Wrong username or password')
    }
  }

  const searchOrder = async () => {
    if (!orderId.trim()) return
    setSearching(true)
    setNotFound(false)
    setOrder(null)

    const res = await fetch('/api/orders')
    const data = await res.json()
    const found = (data.orders || []).find((o: any) => o.id === orderId.trim().toUpperCase())

    if (found) {
      setOrder(found)
    } else {
      setNotFound(true)
    }
    setSearching(false)
  }

  const updateStatus = async (status: string) => {
    if (!order) return
    await fetch('/api/orders/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: order.id, status, username }),
    })
    setOrder({ ...order, status })
  }

  if (!loggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-8 max-w-sm w-full text-center">
          <HiLockClosed className="text-4xl text-end-400 mx-auto mb-4" />
          <h1 className="font-minecraft text-xl gradient-text mb-4">Staff Login</h1>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)}
            placeholder="Username..."
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-end-500/20 focus:border-end-400 outline-none text-white placeholder-gray-500 transition-all mb-3" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Password..."
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-end-500/20 focus:border-end-400 outline-none text-white placeholder-gray-500 transition-all mb-3" />
          {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
          <button onClick={handleLogin}
            className="w-full btn-primary py-3 rounded-lg text-sm font-medium">Login</button>
        </motion.div>
      </main>
    )
  }

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-minecraft text-2xl gradient-text">Order Lookup</h1>
          <button onClick={() => { setLoggedIn(false); setOrder(null); setOrderId('') }}
            className="text-xs text-gray-500 hover:text-red-400 transition-all">Logout</button>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <label className="text-xs text-gray-400 mb-2 block">Paste Order ID</label>
          <div className="flex gap-2">
            <input type="text" value={orderId} onChange={e => setOrderId(e.target.value)}
              placeholder="e.g. END-K8XJ2A-F9ZQ"
              onKeyDown={e => e.key === 'Enter' && searchOrder()}
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-end-500/20 focus:border-end-400 outline-none text-white placeholder-gray-500 transition-all text-sm" />
            <button onClick={searchOrder} disabled={searching}
              className="btn-primary px-5 py-3 rounded-lg text-sm flex items-center gap-2">
              <HiSearch /> Search
            </button>
          </div>
        </div>

        {searching && (
          <div className="text-center py-8">
            <p className="text-gray-500">Searching...</p>
          </div>
        )}

        {notFound && (
          <div className="glass-card rounded-2xl p-8 text-center">
            <HiX className="text-3xl text-red-400 mx-auto mb-3" />
            <p className="text-gray-400">No order found with that ID</p>
          </div>
        )}

        {order && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="glass-card rounded-2xl p-6 mb-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-minecraft text-sm text-end-300">{order.id}</span>
                    <button onClick={() => copyId(order.id)} className="text-gray-500 hover:text-end-400 transition-all">
                      {copied ? <HiCheck className="text-green-400" /> : <HiClipboardCopy />}
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm">
                    <span className="text-end-300 font-medium">{order.player}</span>
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  order.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                  'bg-amber-500/20 text-amber-400'
                }`}>
                  {order.status === 'pending' ? '⏳ Pending' : order.status === 'completed' ? '✅ Completed' : '❌ Cancelled'}
                </span>
              </div>

              <div className="glass rounded-lg p-4 mb-4">
                <p className="text-xs text-gray-500 mb-2">Items Ordered</p>
                {order.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm py-1">
                    <span className="text-gray-300">{item.name} x{item.quantity}</span>
                    <span className="text-end-400">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t border-end-500/10 mt-2 pt-2 flex justify-between">
                  <span className="text-gray-500 text-sm">Total</span>
                  <span className="font-minecraft gradient-text">₹{order.total}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-4">Ordered: {new Date(order.createdAt).toLocaleString()}</p>

              {order.status === 'pending' && (
                <div className="flex gap-3">
                  <button onClick={() => updateStatus('completed')}
                    className="flex-1 px-4 py-3 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all text-sm font-medium flex items-center justify-center gap-2">
                    <HiCheck /> Payment Received
                  </button>
                  <button onClick={() => updateStatus('cancelled')}
                    className="flex-1 px-4 py-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all text-sm font-medium flex items-center justify-center gap-2">
                    <HiX /> Cancel
                  </button>
                </div>
              )}

              {order.status === 'completed' && (
                <div className="glass rounded-lg p-4 text-center">
                  <p className="text-green-400 text-sm flex items-center justify-center gap-2"><HiCheck /> Delivered</p>
                </div>
              )}
            </div>

            <div className="glass-card rounded-2xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-2">Commands to run in-game:</p>
              <div className="glass rounded-lg p-3 text-left text-xs text-cyan-400 font-mono break-all">
                {order.items.map((item: any) => item.command || '').filter(Boolean).join('\n') || '/lp user {player} ...'}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
