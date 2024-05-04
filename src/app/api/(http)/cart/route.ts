import { NextRequest, NextResponse } from 'next/server'
import { z, ZodError } from 'zod'

import { getSessionId } from '@/utils/get-session-id'

import { BadRequestError } from '../../_errors/bad-request-error'
import { ValidationError } from '../../_errors/validation-error'
import { makeCreateCartUseCase } from '../../_use-cases/factories/make-create-cart-use-case'

export async function POST(req: NextRequest) {
  try {
    const cartRequestSchema = z
      .object({
        slug: z.string().uuid(),
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
