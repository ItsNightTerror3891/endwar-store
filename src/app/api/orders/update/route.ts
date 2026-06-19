import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const ORDERS_FILE = join(process.cwd(), 'src', 'data', 'orders.json')

function readOrders(): any[] {
  try {
    if (!existsSync(ORDERS_FILE)) return []
    return JSON.parse(readFileSync(ORDERS_FILE, 'utf-8'))
  } catch { return [] }
}

function writeOrders(orders: any[]) {
  writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8')
}

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

    const orders = readOrders()
    const index = orders.findIndex((o: any) => o.id === orderId)

    if (index === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    orders[index].status = status
    orders[index].updatedAt = new Date().toISOString()
    writeOrders(orders)

    return NextResponse.json({ success: true, order: orders[index] })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
