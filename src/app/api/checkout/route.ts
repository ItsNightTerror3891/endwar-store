import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

const DATA_DIR = join(process.cwd(), 'src', 'data')
const ORDERS_FILE = join(DATA_DIR, 'orders.json')

function readOrders(): any[] {
  try {
    if (!existsSync(ORDERS_FILE)) return []
    return JSON.parse(readFileSync(ORDERS_FILE, 'utf-8'))
  } catch { return [] }
}

function writeOrders(orders: any[]) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
  writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8')
}

export async function POST(req: NextRequest) {
  try {
    const order = await req.json()

    if (!order.id || !order.player || !order.items || !order.total) {
      return NextResponse.json({ error: 'Invalid order data' }, { status: 400 })
    }

    const orders = readOrders()
    orders.push(order)
    writeOrders(orders)

    return NextResponse.json({ success: true, orderId: order.id })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
