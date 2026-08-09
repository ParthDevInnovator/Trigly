
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { stripe } from '../../../../lib/stripe';

export async function GET() {
  const user = await currentUser()
  if (!user) return NextResponse.json({ status: 404 })

  const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID

  if (process.env.DEMO_MODE === 'true') {
    return NextResponse.json({
      status: 200,
      session_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?session_id=demo_session_${user.id}`,
    })
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?cancel=true`,
  })
  if (session) {
    return NextResponse.json({
      status: 200,
      session_url: session.url,
    })
  }

  return NextResponse.json({ status: 400 })
}