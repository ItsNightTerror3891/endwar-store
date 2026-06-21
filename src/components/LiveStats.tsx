'use client'
import { motion } from 'framer-motion'
import { HiServer, HiUsers, HiShoppingCart, HiStar } from 'react-icons/hi'

const stats = [
  { label: 'Players Online', value: '0', icon: HiUsers },
  { label: 'Total Purchases', value: '0', icon: HiShoppingCart },
  { label: 'Active Ranks', value: '0', icon: HiStar },
]

export default function LiveStats() {
  return (
    <div className="flex items-center gap-4 md:gap-6">
      {stats.map(stat => (
        <div key={stat.label} className="flex items-center gap-2 text-xs md:text-sm">
          <stat.icon className="text-end-400" />
          <span className="text-gray-400">{stat.label}:</span>
          <span className="text-white font-bold">{stat.value}</span>
        </div>
      ))}
    </div>
  )
}

export function ServerIP() {
  const serverIP = 'play.slayermcc.fun'

  const copyIP = () => {
    navigator.clipboard.writeText(serverIP)
  }

  return (
    <div className="glass inline-flex items-center gap-3 px-4 py-2 rounded-lg">
      <HiServer className="text-cyan-400" />
      <span className="font-minecraft text-sm text-cyan-400">{serverIP}</span>
      <button onClick={copyIP}
        className="text-xs px-3 py-1 rounded bg-end-500/20 hover:bg-end-500/40 text-end-300 transition-all">
        Copy IP
      </button>
    </div>
  )
}
