'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        const inc = Math.random() * 15 + 5
        return Math.min(p + inc, 100)
      })
    }, 400)
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => { clearInterval(interval); clearTimeout(timer) }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[100] bg-[#08000d] flex flex-col items-center justify-center">
          <div className="relative w-32 h-32 mb-8">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-end-400 border-r-end-500" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 rounded-full border-4 border-transparent border-b-cyan-400 border-l-cyan-500" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-end-500 to-cyan-500 flex items-center justify-center">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(156,77,255,0.8)]" />
            </div>
          </div>
          <h1 className="font-minecraft text-2xl gradient-text mb-4">Loading EndWar Store...</h1>
          <div className="w-64 h-2 rounded-full bg-end-900/50 overflow-hidden border border-end-500/20">
            <motion.div className="h-full bg-gradient-to-r from-end-500 to-cyan-400 rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
          </div>
          <p className="text-gray-500 text-xs mt-2">{Math.floor(progress)}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
