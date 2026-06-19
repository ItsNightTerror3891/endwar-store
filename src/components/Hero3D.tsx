'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let anim: number
    let stars: { x: number; y: number; z: number; size: number; speed: number }[] = []
    const starCount = 300

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 3,
        size: Math.random() * 2.5 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
      })
    }

    const particles: { x: number; y: number; vx: number; vy: number; life: number; hue: number }[] = []

    const draw = () => {
      ctx.fillStyle = 'rgba(8, 0, 13, 0.3)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars = stars.map(s => {
        s.y -= s.speed
        s.x += Math.sin(s.y * 0.01) * 0.3
        if (s.y < -10) {
          s.y = canvas.height + 10
          s.x = Math.random() * canvas.width
        }
        const opacity = 0.3 + s.z * 0.25
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 130, 255, ${opacity})`
        ctx.fill()
        return s
      })

      if (Math.random() < 0.05) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -(Math.random() * 2.5 + 1),
          life: 120,
          hue: 240 + Math.random() * 60,
        })
      }

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.life--
        const alpha = p.life / 120
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${alpha})`
        ctx.fill()
        ctx.shadowBlur = 15
        ctx.shadowColor = `hsla(${p.hue}, 80%, 60%, ${alpha})`
        ctx.fill()
        ctx.shadowBlur = 0
        if (p.life <= 0) particles.splice(i, 1)
      })

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      const portalGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 200)
      portalGrad.addColorStop(0, 'rgba(120, 60, 255, 0.15)')
      portalGrad.addColorStop(0.5, 'rgba(60, 180, 255, 0.08)')
      portalGrad.addColorStop(1, 'rgba(8, 0, 13, 0)')
      ctx.fillStyle = portalGrad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      anim = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(anim); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-end-950/80 via-transparent to-[#08000d] z-[1]" />

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 text-xs md:text-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-gray-300">Server Online — </span>
            <span className="font-minecraft text-cyan-400">endwarmc.aternos.me</span>
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
          className="font-minecraft text-5xl md:text-7xl lg:text-8xl gradient-text mb-6 leading-tight">
          EndWar Lifesteal
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
          className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-8">
          Steal hearts, forge alliances, and survive. The more hearts you take, the stronger you become. Lifesteal SMP at its peak.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/store" className="btn-primary px-8 py-3 rounded-lg font-medium text-sm">
            View Store
          </a>
          <a href="https://discord.gg/WZUr5TYn5g" className="glass px-8 py-3 rounded-lg font-medium text-sm hover:border-end-400 transition-all">
            Join Discord
          </a>
        </motion.div>


      </div>

      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-end-400/50 flex items-start justify-center p-1.5">
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-end-400" />
        </div>
      </motion.div>
    </section>
  )
}
