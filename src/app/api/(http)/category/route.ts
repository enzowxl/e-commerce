import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z, ZodError } from 'zod'

import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { UnauthorizedError } from '@/app/api/_errors/unauthorized-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { createSlug } from '@/utils/create-slug'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { CategoryAlreadyExistsError } from '../../_errors/category-already.exists-error'
import { CategoryNotExistsError } from '../../_errors/category-not-exists-error'
import { PrismaCategoriesRepository } from '../../_repository/prisma/prisma-categories-repository'
import { CreateCategoryUseCase } from '../../_use-cases/create-category'
import { FetchAllCategoriesUseCase } from '../../_use-cases/fetch-all-categories'
import { UpdateCategoryUseCase } from '../../_use-cases/update-category'

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token) throw new UnauthorizedError()

    const categoriesRepository = new PrismaCategoriesRepository()
    const fetchAllCategories = new FetchAllCategoriesUseCase(
      categoriesRepository,
    )

    const categories = await fetchAllCategories.execute()

    return NextResponse.json(categories, { status: 200 })
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      throw new UnauthorizedError()
    }
    throw new BadRequestError()
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token) throw new UnauthorizedError()

    const { cannot } = await getUserPermissions(token.sub as string)

    if (cannot('create', 'Category')) throw new UnauthorizedError()

    const categoryRequestSchema = z
      .object({
        name: z.string(),
        avatarUrl: z.string().optional(),
      })
      .parseAsync(await req.json())

    const { name, avatarUrl } = await categoryRequestSchema

    const categoriesRepository = new PrismaCategoriesRepository()
    const createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepository,
    )

    await createCategoryUseCase.execute({
      name,
      avatarUrl,
      slug: createSlug(name),
    })

    return NextResponse.json({}, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError()
    }
    if (err instanceof CategoryAlreadyExistsError) {
      throw new CategoryAlreadyExistsError()
    }
    throw new BadRequestError()
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token) throw new UnauthorizedError()

    const { cannot } = await getUserPermissions(token.sub as string)

    if (cannot('update', 'Category')) throw new UnauthorizedError()

    const categoryRequestSchema = z
      .object({
        slug: z.string(),
        name: z.string().optional(),
        avatarUrl: z.string().optional(),
      })
      .parseAsync(await req.json())
    const { slug, name, avatarUrl } = await categoryRequestSchema

    const categoriesRepository = new PrismaCategoriesRepository()
    const updateCategoryUseCase = new UpdateCategoryUseCase(
      categoriesRepository,
    )

    await updateCategoryUseCase.execute({
      slug,
      data: {
        name,
        avatarUrl,
      },
    })
    return NextResponse.json({}, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError()
    }
    if (err instanceof CategoryNotExistsError) {
      throw new CategoryNotExistsError()
    }
    if (err instanceof UnauthorizedError) {
      throw new UnauthorizedError()
    }
    throw new BadRequestError()
  }
}
