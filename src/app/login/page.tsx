'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/app/providers'
import { useRouter } from 'next/navigation'

export default function PlayerLogin() {
  const { player, setPlayer } = useStore()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [loginMethod, setLoginMethod] = useState<'java' | 'bedrock' | 'cracked'>('java')
  const [step, setStep] = useState<'input' | 'preview'>('input')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [skinUrl, setSkinUrl] = useState('')

  useEffect(() => {
    if (player) router.push('/store')
  }, [player, router])

  const validateUsername = (name: string) => /^[a-zA-Z0-9_]{3,16}$/.test(name)

  const handleLogin = async () => {
    if (!validateUsername(username)) { setError('Invalid username (3-16 chars, letters/numbers/underscores)'); return }
    setError('')
    setLoading(true)

    if (loginMethod === 'java' || loginMethod === 'bedrock') {
      setSkinUrl(`https://mc-heads.net/avatar/${username}/64`)
    } else {
      setSkinUrl(`https://mc-heads.net/avatar/${username}/64`)
    }

    setTimeout(() => {
      setPlayer({
        username,
        uuid: `${username}-uuid`,
        skinUrl: `https://mc-heads.net/avatar/${username}/64`,
        loginMethod,
        loggedInAt: Date.now(),
      })
      setLoading(false)
      router.push('/store')
    }, 1000)
  }

  if (player) return null

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-b from-end-950/50 via-transparent to-end-950/50 pointer-events-none" />

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="relative glass-card rounded-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-end-400 to-cyan-400 end-glow flex items-center justify-center">
            <span className="font-minecraft text-2xl">E</span>
          </div>
          <h1 className="font-minecraft text-xl gradient-text mb-2">Login</h1>
          <p className="text-gray-400 text-sm">Enter your Minecraft username to continue</p>
        </div>

        {step === 'input' ? (
          <div className="space-y-4">
            <div className="flex gap-2">
              {(['java', 'bedrock', 'cracked'] as const).map(method => (
                <button key={method} onClick={() => setLoginMethod(method)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                    loginMethod === method ? 'bg-end-500 text-white' : 'glass text-gray-400 hover:text-white'
                  }`}>
                  {method === 'java' ? 'Java' : method === 'bedrock' ? 'Bedrock' : 'Cracked'}
                </button>
              ))}
            </div>

            <div>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                placeholder="Enter your Minecraft username..."
                maxLength={16}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-end-500/20 focus:border-end-400 outline-none text-white placeholder-gray-500 transition-all"
                onKeyDown={e => e.key === 'Enter' && handleLogin()} />
              {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            </div>

            <button onClick={handleLogin} disabled={loading || !username}
              className="w-full btn-primary py-3 rounded-lg font-medium text-sm disabled:opacity-50 transition-all">
              {loading ? 'Verifying...' : 'Continue'}
            </button>
          </div>
        ) : null}
      </motion.div>
    </div>
  )
}
