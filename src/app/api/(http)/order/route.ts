import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z, ZodError } from 'zod'

import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { UnauthorizedError } from '@/app/api/_errors/unauthorized-error'
import { ValidationError } from '@/app/api/_errors/validation-error'

import { makeCreateOrderUseCase } from '../../_use-cases/factories/make-create-order-use-case'
import { makeFetchAllUserOrdersUseCase } from '../../_use-cases/factories/make-fetch-all-user-orders-use-case'

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token) throw new UnauthorizedError()

    const fetchAllUserOrdersUseCase = makeFetchAllUserOrdersUseCase()

    const orders = await fetchAllUserOrdersUseCase.execute({
      email: token.email as string,
    })

    return NextResponse.json(orders, { status: 200 })
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return new UnauthorizedError().error()
    }
    return new BadRequestError().error()
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token) throw new UnauthorizedError()

    const orderRequestSchema = z
      .object({
        totalPrice: z.number(),
        subtotalPrice: z.number(),
        totalDiscounts: z.number(),
        products: z.array(
          z.object({
            id: z.string(),
            price: z.number(),
            quantity: z.number().int(),
            discount: z.number().int(),
            size: z.string().optional(),
            color: z.string().optional(),
          }),
        ),
      })
      .parseAsync(await req.json())

    const { products, subtotalPrice, totalDiscounts, totalPrice } =
      await orderRequestSchema

    const createOrderUseCase = makeCreateOrderUseCase()

    const order = await createOrderUseCase.execute({
      userId: token?.sub as string,
      status: 'WAITING_FOR_PAYMENT',
      subtotalPrice,
      totalPrice,
      totalDiscounts,
      orderItems: {
        createMany: {
          data: products?.map((product) => {
            return {
              price: product.price,
              discount: product.discount,
              quantity: product.quantity,
              productId: product.id,
              size: product.size,
              color: product.color,
            }
          }),
        },
      },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (err) {
    console.log(err)
    if (err instanceof ZodError) {
      return new ValidationError().error()
    }
    if (err instanceof UnauthorizedError) {
      return new UnauthorizedError().error()
    }
    return new BadRequestError().error()
  }
}
