import { NextRequest, NextResponse } from 'next/server'
import { handleIncomingEvent } from '@/lib/automation/handleIncomingEvent'

export async function GET(req: NextRequest) {
  const hub = req.nextUrl.searchParams.get('hub.challenge')
  return new NextResponse(hub)
}

export async function POST(req: NextRequest) {
  const webhook_payload = await req.json()
  const result = await handleIncomingEvent(webhook_payload)

  return NextResponse.json(
    { message: result.message },
    { status: result.status }
  )
}
