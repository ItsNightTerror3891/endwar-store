import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function POST(req: NextRequest) {
  try {
    const order = await req.json()

    if (!order.id || !order.player || !order.items || !order.total) {
      return NextResponse.json({ error: 'Invalid order data' }, { status: 400 })
    }

    const orders = (await kv.get<any[]>('orders')) || []
    orders.push(order)
    await kv.set('orders', orders)

    return NextResponse.json({ success: true, orderId: order.id })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
