'use client'
import { motion } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/products'
import Link from 'next/link'
import { HiArrowLeft } from 'react-icons/hi'

export default function RanksPage() {
  const ranks = products.filter(p => p.category === 'rank')

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/store" className="inline-flex items-center gap-2 text-gray-400 hover:text-end-400 text-sm transition-all mb-4">
            <HiArrowLeft /> Back to Store
          </Link>
          <h1 className="font-minecraft text-3xl md:text-4xl gradient-text mb-4">Ranks</h1>
          <p className="text-gray-400">Unlock exclusive perks and stand out with a premium rank</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ranks.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </main>
  )
}
