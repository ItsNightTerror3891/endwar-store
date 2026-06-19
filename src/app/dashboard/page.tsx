'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/app/providers'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { HiClipboardCopy, HiCheck, HiClock, HiExclamation } from 'react-icons/hi'

interface Order {
  id: string
  player: string
  items: { name: string; quantity: number }[]
  total: number
  status: string
  createdAt: string
}

export default function DashboardPage() {
  const { player, logout } = useStore()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [copied, setCopied] = useState('')

  if (!player) {
    router.push('/login')
    return null
  }

  useEffect(() => {
    fetch(`/api/orders?player=${player.username}`)
      .then(r => r.json())
      .then(data => setOrders(data.orders || []))
      .catch(() => {})
  }, [player.username])

  const copyIP = () => {
    navigator.clipboard.writeText('endwarmc.aternos.me')
    setCopied('ip')
    setTimeout(() => setCopied(''), 2000)
  }

  const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
    pending: { color: 'text-amber-400', icon: HiClock, label: 'Pending' },
    completed: { color: 'text-green-400', icon: HiCheck, label: 'Completed' },
    cancelled: { color: 'text-red-400', icon: HiExclamation, label: 'Cancelled' },
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={`https://mc-heads.net/avatar/${player.username}/48`} alt="" className="w-12 h-12 rounded-full" />
              <div>
                <h1 className="font-minecraft text-2xl gradient-text">{player.username}</h1>
                <p className="text-gray-500 text-xs">Dashboard</p>
              </div>
            </div>
            <button onClick={logout} className="text-xs text-gray-500 hover:text-red-400 transition-all">Logout</button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass-card rounded-xl p-4">
            <p className="text-gray-500 text-xs mb-1">Total Orders</p>
            <p className="font-minecraft text-2xl gradient-text">{orders.length}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-4">
            <p className="text-gray-500 text-xs mb-1">Completed</p>
            <p className="font-minecraft text-2xl text-green-400">{orders.filter(o => o.status === 'completed').length}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="glass-card rounded-xl p-4">
            <p className="text-gray-500 text-xs mb-1">Server IP</p>
            <button onClick={copyIP} className="font-minecraft text-sm text-cyan-400 hover:text-cyan-300 transition-all flex items-center gap-2 mt-1">
              endwarmc.aternos.me
              {copied === 'ip' ? <HiCheck className="text-green-400" /> : <HiClipboardCopy className="text-gray-500" />}
            </button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6">
          <h2 className="font-minecraft text-sm text-end-300 mb-6">Order History</h2>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No orders yet</p>
              <Link href="/store" className="btn-primary px-6 py-2 rounded-lg text-sm">Browse Store</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => {
                const cfg = statusConfig[order.status] || statusConfig.pending
                const StatusIcon = cfg.icon
                return (
                  <div key={order.id} className="glass rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-minecraft text-xs text-end-300">{order.id}</span>
                        <span className={`text-xs flex items-center gap-1 ${cfg.color}`}>
                          <StatusIcon /> {cfg.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-minecraft text-sm gradient-text">₹{order.total}</p>
                      <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}
