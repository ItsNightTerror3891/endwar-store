'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiFilter, HiChevronDown } from 'react-icons/hi'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/products'

const categories = ['all', 'rank', 'keys'] as const

const categoryLabels: Record<string, string> = {
  all: 'All Items',
  rank: 'Ranks',
  keys: 'Key Packs',
}

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high'>('default')

  const filtered = products
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-low') return (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price)
      if (sortBy === 'price-high') return (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price)
      return 0
    })

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-minecraft text-3xl md:text-4xl gradient-text mb-4">Store</h1>
          <p className="text-gray-400">Browse keys, ranks, and bundles to enhance your Lifesteal experience</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat ? 'bg-end-500 text-white' : 'glass text-gray-400 hover:text-white'
                }`}>
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          <div className="relative">
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="appearance-none px-4 py-2 pr-8 rounded-lg glass text-sm text-gray-300 outline-none cursor-pointer">
              <option value="default">Sort: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 font-minecraft text-lg">No items in this category</p>
          </div>
        )}
      </div>
    </main>
  )
}
