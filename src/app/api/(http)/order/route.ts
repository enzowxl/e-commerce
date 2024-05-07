import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z, ZodError } from 'zod'

import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { UnauthorizedError } from '@/app/api/_errors/unauthorized-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token) throw new UnauthorizedError()

    const orderRequestSchema = z
      .object({
        userId: z.string().uuid(),
        products: z.array(
          z.object({
            id: z.string(),
            price: z.number(),
            quantity: z.number().int(),
            discount: z.number().int(),
          }),
        ),
      })
      .parseAsync(await req.json())

    const { userId, products } = await orderRequestSchema

    const order = await prisma.order.create({
      data: {
        userId,
        status: 'WAITING_FOR_PAYMENT',
        orderItems: {
          createMany: {
            data: products.map((product) => {
              return {
                price: product.price,
                discount: product.discount,
                quantity: product.quantity,
                productId: product.id,
              }
            }),
          },
        },
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    })

    return NextResponse.json(order, { status: 201 })
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
