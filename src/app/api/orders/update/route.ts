import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderId, status, password } = body

    if (password !== 'endwar123') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!orderId || !status) {
      return NextResponse.json({ error: 'orderId and status required' }, { status: 400 })
    }

    const orders = (await kv.get<any[]>('orders')) || []
    const index = orders.findIndex((o: any) => o.id === orderId)

    if (index === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    orders[index].status = status
    orders[index].updatedAt = new Date().toISOString()
    await kv.set('orders', orders)

    return NextResponse.json({ success: true, order: orders[index] })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
