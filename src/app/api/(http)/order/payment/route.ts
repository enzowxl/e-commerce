import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { env } from '@/env'
import { prisma } from '@/lib/prisma'

const stripe = new Stripe(env.STRIPE_SECRET_TEST)
export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature') as string

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    env.STRIPE_WEBHOOK_SECRET,
  )

  switch (event.type) {
    case 'payment_intent.succeeded':
      await prisma.order.update({
        where: {
          id: event.data.object?.metadata.orderId,
        },
        data: {
          status: 'PAYMENT_CONFIRMED',
        },
      })
      break
  }

  return NextResponse.json({}, { status: 200 })
}
