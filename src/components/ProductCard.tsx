'use client'
import { motion } from 'framer-motion'
import { HiShoppingCart, HiCheck } from 'react-icons/hi'
import { useStore } from '@/app/providers'
import { StoreProduct } from '@/lib/types'

export default function ProductCard({ product, index }: { product: StoreProduct; index: number }) {
  const { addToCart, itemInCart } = useStore()
  const inCart = itemInCart(product.id)
  const displayPrice = product.discountPrice ?? product.price

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08, duration: 0.5 }}
      className={`glass-card rounded-2xl p-6 flex flex-col relative overflow-hidden group ${product.featured ? 'ring-1 ring-end-400' : ''}`}>

      {product.featured && (
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-end-500/20 border border-end-500/40 text-end-300 text-xs font-medium">
          Popular
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl ${getBadgeColor(product.category)} flex items-center justify-center text-lg`}>
          {getEmoji(product.category)}
        </div>
        <div>
          <h3 className="font-minecraft text-sm">{product.name}</h3>
          <p className="text-gray-500 text-xs">{getCategoryLabel(product.category)}</p>
        </div>
      </div>

      {product.category === 'bundle' && product.description && (
        <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-1">{product.description}</p>
      )}

      {product.category === 'bundle' && product.features.length > 0 && (
        <div className="space-y-2 mb-4">
          {product.features.slice(0, 3).map((feat, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
            <HiCheck className="text-end-400 flex-shrink-0" />
            <span>{feat}</span>
          </div>
        ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-end-500/10">
        <div>
          <span className="font-minecraft text-lg gradient-text">₹{displayPrice}</span>
          {product.discountPrice && (
            <span className="text-gray-500 text-xs line-through ml-2">₹{product.price}</span>
          )}
        </div>
        <button
          onClick={() => addToCart({ id: product.id, name: product.name, price: displayPrice, quantity: 1, product })}
          disabled={inCart}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
            inCart ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'btn-primary'
          } disabled:opacity-80`}>
          {inCart ? <><HiCheck /> In Cart</> : <><HiShoppingCart /> Add to Cart</>}
        </button>
      </div>
    </motion.div>
  )
}

function getBadgeColor(category: string) {
  switch (category) {
    case 'rank': return 'bg-end-500/20'
    case 'crate': return 'bg-purple-500/20'
    case 'keys': return 'bg-cyan-500/20'
    case 'bundle': return 'bg-amber-500/20'
    default: return 'bg-end-500/20'
  }
}

function getEmoji(category: string) {
  switch (category) {
    case 'rank': return '👑'
    case 'crate': return '📦'
    case 'keys': return '🔑'
    case 'bundle': return '💎'
    default: return '🛒'
  }
}

function getCategoryLabel(category: string) {
  switch (category) {
    case 'rank': return 'Rank Upgrade'
    case 'crate': return 'Crate'
    case 'keys': return 'Key Pack'
    case 'bundle': return 'Bundle'
    default: return 'Product'
  }
}
