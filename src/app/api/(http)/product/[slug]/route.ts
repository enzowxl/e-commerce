import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z, ZodError } from 'zod'

import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { ProductNotExistsError } from '@/app/api/_errors/product-not-exists-error'
import { UnauthorizedError } from '@/app/api/_errors/unauthorized-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { makeDeleteProductUseCase } from '@/app/api/_use-cases/factories/make-delete-product-use-case'
import { makeFetchProductUseCase } from '@/app/api/_use-cases/factories/make-fetch-product-use-case'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function GET(
  _: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const productParamsSchema = z
      .object({
        slug: z.string(),
      })
      .parse(params)

    const { slug } = productParamsSchema

    const fetchProductUseCase = makeFetchProductUseCase()

    const product = await fetchProductUseCase.execute({ slug })

    return NextResponse.json(product, { status: 200 })
  } catch (err) {
    if (err instanceof ZodError) {
      return new ValidationError().error()
    }
    if (err instanceof ProductNotExistsError) {
      return new ProductNotExistsError().error()
    }
    return new BadRequestError().error()
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const token = await getToken({ req })

    if (!token) throw new UnauthorizedError()

    const { cannot } = await getUserPermissions(token.sub as string)

    if (cannot('delete', 'Product')) throw new UnauthorizedError()

    const productParamsSchema = z
      .object({
        slug: z.string(),
      })
      .parse(params)

    const { slug } = productParamsSchema

    const deleteProductUseCase = makeDeleteProductUseCase()

    await deleteProductUseCase.execute({ slug })

    return NextResponse.json({}, { status: 200 })
  } catch (err) {
    if (err instanceof ZodError) {
      return new ValidationError().error()
    }
    if (err instanceof ProductNotExistsError) {
      return new ProductNotExistsError().error()
    }
    return new BadRequestError().error()
  }
}
