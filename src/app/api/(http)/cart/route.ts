import { NextRequest, NextResponse } from 'next/server'
import { z, ZodError } from 'zod'

import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { makeCreateCartUseCase } from '@/app/api/_use-cases/factories/make-create-cart-use-case'
import { makeFetchCartUseCase } from '@/app/api/_use-cases/factories/make-fetch-cart-use-case'
import { getSessionId } from '@/utils/get-session-id'

export async function GET() {
  try {
    const sessionId = getSessionId()

    const fetchCartUseCase = makeFetchCartUseCase()

    const cart = await fetchCartUseCase.execute({ sessionId })

    return NextResponse.json(cart, { status: 200 })
  } catch (err) {
    return new BadRequestError().error()
  }
}

export async function POST(req: NextRequest) {
  try {
    const cartRequestSchema = z
      .object({
        slug: z.string(),
        userId: z.string().uuid().optional(),
      })
      .parseAsync(await req.json())

    const { slug, userId } = await cartRequestSchema

    const sessionId = getSessionId()

    const createCartUseCase = makeCreateCartUseCase()

    await createCartUseCase.execute({
      sessionId,
      slug,
      userId,
    })

    return NextResponse.json({}, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) {
      return new ValidationError().error()
    }
    return new BadRequestError().error()
  }
}
