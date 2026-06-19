'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useStore } from '@/app/providers'
import CartDrawer from './CartDrawer'
import { HiMenu, HiX, HiShoppingCart, HiUser } from 'react-icons/hi'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Store', href: '/store' },
  { label: 'Keys', href: '/keys' },
  { label: 'Discord', href: 'https://discord.gg/WZUr5TYn5g' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { player, cartCount } = useStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full end-glow bg-gradient-to-br from-end-400 to-cyan-400 flex items-center justify-center text-xs font-bold">E</div>
              <span className="font-minecraft text-lg gradient-text">EndWar</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map(item => (
                <Link key={item.label} href={item.href}
                  className="text-gray-300 hover:text-end-400 transition-all duration-300 text-sm font-medium hover:drop-shadow-[0_0_10px_rgba(156,77,255,0.5)]">
                  {item.label}
                </Link>
              ))}
              {player ? (
                <Link href="/dashboard" className="flex items-center gap-2 glass px-4 py-2 rounded-lg text-sm hover:border-end-400 transition-all">
                  <img src={`https://mc-heads.net/avatar/${player.username}/24`} alt="" className="w-6 h-6 rounded-full" />
                  <span className="text-end-300">{player.username}</span>
                </Link>
              ) : (
                <Link href="/login" className="btn-primary px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                  <HiUser /> Login
                </Link>
              )}
              <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 glass px-4 py-2 rounded-lg text-sm hover:border-end-400 transition-all group">
                <HiShoppingCart className="text-lg group-hover:text-end-400" />
                <span className="hidden sm:inline text-gray-300 group-hover:text-end-400">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-end-500 rounded-full text-xs flex items-center justify-center font-bold text-white">{cartCount}</span>
                )}
              </button>
            </div>

            <div className="flex md:hidden items-center gap-3">
              <button onClick={() => setCartOpen(true)} className="relative p-2 text-gray-300 glass rounded-lg">
                <HiShoppingCart className="text-xl" />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-end-500 rounded-full text-xs flex items-center justify-center text-white">{cartCount}</span>}
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-300 p-2">
                {mobileOpen ? <HiX className="text-xl" /> : <HiMenu className="text-xl" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-end-500/20">
              <div className="px-4 py-4 space-y-3">
                {navItems.map(item => (
                  <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2 rounded-lg hover:bg-end-500/10 text-gray-300 hover:text-end-400 transition-all">
                    {item.label}
                  </Link>
                ))}
                {player ? (
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
                    <img src={`https://mc-heads.net/avatar/${player.username}/24`} alt="" className="w-6 h-6 rounded-full" />
                    <span className="text-end-300">{player.username}</span>
                  </Link>
                ) : (
                  <Link href="/login" onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2 btn-primary rounded-lg text-center">Login</Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
