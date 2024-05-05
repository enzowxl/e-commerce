import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import Stripe from 'stripe'
import { z, ZodError } from 'zod'

import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { UnauthorizedError } from '@/app/api/_errors/unauthorized-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { env } from '@/env'

const stripe = new Stripe(env.STRIPE_SECRET_TEST)
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token) throw new UnauthorizedError()

    const checkoutRequestSchema = z
      .object({
        orderId: z.string(),
        products: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            price: z.number(),
            quantity: z.number().int(),
            description: z.string().optional(),
            photos: z.string().array().optional(),
          }),
        ),
      })
      .parseAsync(await req.json())

    const { products, orderId } = await checkoutRequestSchema

    const checkout = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: env.STRIPE_SUCESS_URL,
      cancel_url: env.STRIPE_CANCEL_URL,
      metadata: {
        orderId,
      },
      line_items: products.map((product) => {
        return {
          price_data: {
            currency: 'brl',
            unit_amount: product.price * 100,
            product_data: {
              name: product.name,
              description: product.description,
              images: product.photos,
            },
          },
          quantity: product.quantity,
        }
      }),
    })

    return NextResponse.json(checkout, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError()
    }
    if (err instanceof UnauthorizedError) {
      throw new UnauthorizedError()
    }
    throw new BadRequestError()
  }
}
