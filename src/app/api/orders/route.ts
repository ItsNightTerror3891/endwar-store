import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const player = searchParams.get('player')

  const allOrders = (await kv.get<any[]>('orders')) || []

  if (!player) {
    return NextResponse.json({ orders: allOrders.reverse() })
  }

  const playerOrders = allOrders.filter(
    (o: any) => o.player.toLowerCase() === player.toLowerCase()
  )

  return NextResponse.json({ orders: playerOrders.reverse() })
}
