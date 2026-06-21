import { StoreProduct } from './types'

export const products: StoreProduct[] = [
  { id: 'lava-key', name: 'Lava Key', price: 150, category: 'keys', description: '', features: [], commands: ['key give {player} lava 1'], image: '', featured: true },
  { id: 'fire-key', name: 'Fire Key', price: 150, category: 'keys', description: '', features: [], commands: ['key give {player} fire 1'], image: '', featured: true },
  { id: 'water-key', name: 'Water Key', price: 100, category: 'keys', description: '', features: [], commands: ['key give {player} water 1'], image: '', featured: true },
  { id: 'god-rank', name: 'God', price: 500, category: 'rank', description: '', features: ['All permissions', 'God mode', 'Exclusive items'], commands: ['lp user {player} parent add god'], duration: 'Permanent', image: '', featured: true },
  { id: 'king-rank', name: 'King', price: 300, category: 'rank', description: '', features: ['King perks', 'Special abilities', 'Premium items'], commands: ['lp user {player} parent add king'], duration: 'Permanent', image: '', featured: true },
]

export function getProductById(id: string) {
  return products.find(p => p.id === id) || null
}
