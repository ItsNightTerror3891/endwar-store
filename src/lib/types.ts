export interface PlayerData {
  username: string
  uuid: string
  skinUrl: string
  loginMethod: 'java' | 'bedrock' | 'cracked'
  loggedInAt: number
}

export interface StoreProduct {
  id: string
  name: string
  category: 'rank' | 'crate' | 'keys' | 'bundle'
  price: number
  discountPrice?: number
  originalPrice?: number
  description: string
  features: string[]
  image: string
  commands: string[]
  duration?: string
  discount?: number
  featured?: boolean
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  product: StoreProduct
}

export interface Order {
  id: string
  player: string
  items: { id: string; name: string; price: number; quantity: number }[]
  total: number
  status: 'pending' | 'processing' | 'delivered'
  paymentMethod: string
  createdAt: number
}

export interface RankData {
  id: string
  name: string
  price: number
  color: string
  features: string[]
  commands: string[]
  duration: string
  priority: number
}

export interface CrateData {
  id: string
  name: string
  price: number
  color: string
  rewards: { name: string; chance: number; image: string }[]
  commands: string[]
}
