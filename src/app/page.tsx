'use client'
import Hero3D from '@/components/Hero3D'
import ProductCard from '@/components/ProductCard'
import { motion } from 'framer-motion'
import { products } from '@/lib/products'
import Link from 'next/link'
import { HiArrowRight } from 'react-icons/hi'

const featuredProducts = products.filter(p => p.featured)
const promoProducts = products.filter(p => p.discountPrice)

export default function HomePage() {
  return (
    <>
      <Hero3D />

      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <h2 className="font-minecraft text-2xl md:text-3xl gradient-text mb-4">Featured Items</h2>
            <p className="text-gray-400 text-sm">Most popular picks from our store</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <motion.div className="text-center mt-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link href="/store" className="inline-flex items-center gap-2 glass px-6 py-3 rounded-lg text-sm hover:border-end-400 transition-all group">
              Browse Full Store <HiArrowRight className="group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>
        </div>
      </section>

      {promoProducts.length > 0 && (
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-12">
              <h2 className="font-minecraft text-2xl md:text-3xl gradient-text mb-4">On Sale</h2>
              <p className="text-gray-400 text-sm">Limited-time discounts</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {promoProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-end-500/10 to-cyan-500/5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-minecraft text-2xl md:text-3xl gradient-text mb-4">Join Our Community</h2>
              <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
                Connect with other players, trade hearts, participate in events, and stay updated with the latest news.
              </p>
              <a href="https://discord.gg/WZUr5TYn5g"
                className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-3 rounded-lg text-sm font-medium transition-all">
                Join Discord Server
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
