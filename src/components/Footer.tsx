'use client'
import Link from 'next/link'
import { HiHeart } from 'react-icons/hi'
import { FaDiscord } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="relative border-t border-end-500/20 bg-[#08000d]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-end-950/30 to-end-950/50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full end-glow bg-gradient-to-br from-end-400 to-cyan-400 flex items-center justify-center text-xs font-bold">E</div>
              <span className="font-minecraft text-lg gradient-text">SlayerMcc</span>
            </div>
            <p className="text-gray-400 text-sm">Premium Lifesteal store. Support us and unlock exclusive keys, ranks, and rewards.</p>
          </div>
          <div>
            <h3 className="font-minecraft text-end-300 mb-4 text-sm">Store</h3>
            <div className="space-y-2">
              {['Ranks', 'Keys'].map(item => (
                <Link key={item} href={`/${item.toLowerCase()}`} className="block text-gray-400 hover:text-end-400 text-sm transition-all">{item}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-minecraft text-end-300 mb-4 text-sm">Links</h3>
            <div className="space-y-2">
              <Link href="/dashboard" className="block text-gray-400 hover:text-end-400 text-sm transition-all">Dashboard</Link>
              <Link href="/leaderboards" className="block text-gray-400 hover:text-end-400 text-sm transition-all">Leaderboards</Link>
              <Link href="https://discord.gg/WZUr5TYn5g" className="block text-gray-400 hover:text-end-400 text-sm transition-all">Discord</Link>
            </div>
          </div>
          <div>
            <h3 className="font-minecraft text-end-300 mb-4 text-sm">Server IP</h3>
            <div className="glass rounded-lg p-3 mb-4">
              <p className="text-cyan-400 font-minecraft text-xs">play.slayermcc.fun</p>
            </div>
            <div className="flex gap-3">
              {[FaDiscord].map((Icon, i) => (
                <a key={i} href="https://discord.gg/WZUr5TYn5g" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-end-400 hover:border-end-400 transition-all">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-end-500/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">© 2026 SlayerMcc Store. Not affiliated with Mojang AB.</p>
          <p className="text-gray-500 text-xs flex items-center gap-1">Made with <HiHeart className="text-red-500" /> for the Lifesteal community</p>
        </div>
      </div>
    </footer>
  )
}
