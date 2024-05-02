import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z, ZodError } from 'zod'

import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { CategoryNotExistsError } from '@/app/api/_errors/category-not-exists-error'
import { UnauthorizedError } from '@/app/api/_errors/unauthorized-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { PrismaCategoriesRepository } from '@/app/api/_repository/prisma/prisma-categories-repository'
import { DeleteCategoryUseCase } from '@/app/api/_use-cases/delete-category'
import { FetchCategoryUseCase } from '@/app/api/_use-cases/fetch-category'
import { getUserPermissions } from '@/utils/get-user-permissions'

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

    const categoriesRepository = new PrismaCategoriesRepository()
    const fetchCategoryUseCase = new FetchCategoryUseCase(categoriesRepository)

    const category = await fetchCategoryUseCase.execute({ slug })

    return NextResponse.json(category, { status: 200 })
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError()
    }
    if (err instanceof CategoryNotExistsError) {
      throw new CategoryNotExistsError()
    }
    throw new BadRequestError()
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

    const categoriesRepository = new PrismaCategoriesRepository()
    const deleteCategoryUseCase = new DeleteCategoryUseCase(
      categoriesRepository,
    )

    await deleteCategoryUseCase.execute({ slug })

    return NextResponse.json({}, { status: 200 })
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError()
    }
    if (err instanceof CategoryNotExistsError) {
      throw new CategoryNotExistsError()
    }
    throw new BadRequestError()
  }
}
