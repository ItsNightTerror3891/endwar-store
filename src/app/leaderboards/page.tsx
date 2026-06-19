'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { HiArrowLeft } from 'react-icons/hi'

interface LeaderboardEntry {
  rank: number
  name: string
  value: number
  change: 'up' | 'down' | 'same'
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: 'ItsNightTerror', value: 25000, change: 'up' },
  { rank: 2, name: 'EndWarrior_X', value: 18200, change: 'up' },
  { rank: 3, name: 'VoidWalker99', value: 15400, change: 'same' },
  { rank: 4, name: 'DragonSlayer_', value: 12800, change: 'down' },
  { rank: 5, name: 'PearlMaster', value: 10500, change: 'up' },
  { rank: 6, name: 'ChorusFruit', value: 9200, change: 'same' },
  { rank: 7, name: 'ShulkerBox', value: 7800, change: 'down' },
  { rank: 8, name: 'ElytraFlyer', value: 6500, change: 'up' },
  { rank: 9, name: 'GatewayHero', value: 5100, change: 'same' },
  { rank: 10, name: 'ObsidianMan', value: 4200, change: 'down' },
]

export default function LeaderboardsPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-end-400 text-sm transition-all mb-4">
            <HiArrowLeft /> Back to Home
          </Link>
          <h1 className="font-minecraft text-3xl md:text-4xl gradient-text mb-4">Leaderboards</h1>
          <p className="text-gray-400">Top supporters of the EndWar community</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-end-500/10 flex items-center justify-between text-xs text-gray-500 font-medium">
            <span className="w-12 text-center">#</span>
            <span className="flex-1">Player</span>
            <span className="w-24 text-right">Total Spent</span>
          </div>

          <div className="divide-y divide-end-500/10">
            {leaderboardData.map((entry, i) => (
              <motion.div key={entry.rank} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-center p-4 hover:bg-end-500/5 transition-all">
                <span className={`w-12 text-center font-minecraft text-sm ${
                  entry.rank <= 3 ? 'gradient-text' : 'text-gray-400'
                }`}>
                  {entry.rank <= 3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : `#${entry.rank}`}
                </span>
                <div className="flex-1 flex items-center gap-3">
                  <img src={`https://mc-heads.net/avatar/${entry.name}/24`} alt="" className="w-6 h-6 rounded-full" />
                  <span className="text-sm font-medium">{entry.name}</span>
                </div>
                <span className="w-24 text-right font-minecraft text-sm gradient-text">₹{entry.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
