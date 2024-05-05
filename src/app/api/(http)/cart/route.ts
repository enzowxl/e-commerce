import { NextRequest, NextResponse } from 'next/server'
import { z, ZodError } from 'zod'

import { getSessionId } from '@/utils/get-session-id'

import { BadRequestError } from '../../_errors/bad-request-error'
import { ValidationError } from '../../_errors/validation-error'
import { makeCreateCartUseCase } from '../../_use-cases/factories/make-create-cart-use-case'
import { makeFetchCartUseCase } from '../../_use-cases/factories/make-fetch-cart-use-case'

export async function GET() {
  const sessionId = getSessionId()

  const fetchCartUseCase = makeFetchCartUseCase()

  const cart = await fetchCartUseCase.execute({ sessionId })

  return NextResponse.json(cart, { status: 200 })
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
      throw new ValidationError()
    }
    throw new BadRequestError()
  }
}
