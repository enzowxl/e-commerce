import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z, ZodError } from 'zod'

import { getUserPermissions } from '@/actions/get-user-permissions'
import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { CategoryNotExistsError } from '@/app/api/_errors/category-not-exists-error'
import { UnauthorizedError } from '@/app/api/_errors/unauthorized-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { makeDeleteCategoryUseCase } from '@/app/api/_use-cases/factories/make-delete-category-use-case'
import { makeFetchCategoryUseCase } from '@/app/api/_use-cases/factories/make-fetch-category-use-case'

export async function GET(
  _: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const categoryParamsSchema = z
      .object({
        slug: z.string(),
      })
      .parse(params)

    const { slug } = categoryParamsSchema

    const fetchCategoryUseCase = makeFetchCategoryUseCase()

    const category = await fetchCategoryUseCase.execute({ slug })

    return NextResponse.json(category, { status: 200 })
  } catch (err) {
    if (err instanceof ZodError) {
      return new ValidationError().error()
    }
    if (err instanceof CategoryNotExistsError) {
      return new CategoryNotExistsError().error()
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

    if (cannot('delete', 'Category')) throw new UnauthorizedError()

    const categoryParamsSchema = z
      .object({
        slug: z.string(),
      })
      .parse(params)

    const { slug } = categoryParamsSchema

    const deleteCategoryUseCase = makeDeleteCategoryUseCase()

    await deleteCategoryUseCase.execute({ slug })

    return NextResponse.json({}, { status: 200 })
  } catch (err) {
    if (err instanceof ZodError) {
      return new ValidationError().error()
    }
    if (err instanceof CategoryNotExistsError) {
      return new CategoryNotExistsError().error()
    }
    return new BadRequestError().error()
  }
}
