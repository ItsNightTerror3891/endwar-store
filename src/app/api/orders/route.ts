import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const ORDERS_FILE = join(process.cwd(), 'src', 'data', 'orders.json')

function readOrders(): any[] {
  try {
    if (!existsSync(ORDERS_FILE)) return []
    return JSON.parse(readFileSync(ORDERS_FILE, 'utf-8'))
  } catch { return [] }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const player = searchParams.get('player')

  const allOrders = readOrders()

  if (!player) {
    return NextResponse.json({ orders: allOrders.reverse() })
  }

  const playerOrders = allOrders.filter(
    (o: any) => o.player.toLowerCase() === player.toLowerCase()
  )

  return NextResponse.json({ orders: playerOrders.reverse() })
}
