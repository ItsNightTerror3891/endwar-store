import { StoreProduct } from './types'

export const products: StoreProduct[] = [
  { id: 'fire-key', name: 'Fire Key', price: 150, category: 'keys', description: '', features: [], commands: ['key give {player} fire 1'], image: '', featured: true },
  { id: 'party-key', name: 'Party Key', price: 100, category: 'keys', description: '', features: [], commands: ['key give {player} party 1'], image: '', featured: true },
  { id: 'water-key', name: 'Water Key', price: 100, category: 'keys', description: '', features: [], commands: ['key give {player} water 1'], image: '', featured: true },
  { id: 'discord-key', name: 'Discord Key', price: 60, category: 'keys', description: '', features: [], commands: ['key give {player} discord 1'], image: '', featured: true },
  { id: 'vip', name: 'VIP', price: 100, category: 'rank', description: '', features: ['/fly', '/hat', 'Colored chat', '3 warps'], commands: ['lp user {player} parent add vip'], duration: 'Permanent', image: '', featured: true },
  { id: 'vip-plus', name: 'VIP+', price: 100, category: 'rank', description: '', features: ['All VIP features', '/nick', '/repair', 'Anvil colors', '5 warps'], commands: ['lp user {player} parent add vip+'], duration: 'Permanent', image: '', featured: true },
  { id: 'warrior', name: 'Warrior', price: 250, category: 'rank', description: '', features: [], commands: ['lp user {player} parent add warrior'], duration: 'Permanent', image: '' },
  { id: 'knight', name: 'Knight', price: 200, category: 'rank', description: '', features: [], commands: ['lp user {player} parent add knight'], duration: 'Permanent', image: '' },
  { id: 'elite', name: 'Elite', price: 150, category: 'rank', description: '', features: [], commands: ['lp user {player} parent add elite'], duration: 'Permanent', image: '' },
  { id: 'legend', name: 'Legend', price: 150, category: 'rank', description: '', features: [], commands: ['lp user {player} parent add legend'], duration: 'Permanent', image: '' },
  { id: 'titan', name: 'Titan', price: 100, category: 'rank', description: '', features: [], commands: ['lp user {player} parent add titan'], duration: 'Permanent', image: '', featured: true },
]

export function getProductById(id: string) {
  return products.find(p => p.id === id) || null
}
