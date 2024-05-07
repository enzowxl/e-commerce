import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z, ZodError } from 'zod'

import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { CategoryAlreadyExistsError } from '@/app/api/_errors/category-already.exists-error'
import { CategoryNotExistsError } from '@/app/api/_errors/category-not-exists-error'
import { UnauthorizedError } from '@/app/api/_errors/unauthorized-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { makeCreateCategoryUseCase } from '@/app/api/_use-cases/factories/make-create-category-use-case'
import { makeFetchAllCategoriesUseCase } from '@/app/api/_use-cases/factories/make-fetch-all-categories-use-case'
import { makeUpdateCategoryUseCase } from '@/app/api/_use-cases/factories/make-update-category-use-case'
import { createSlug } from '@/utils/create-slug'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function GET() {
  try {
    // const token = await getToken({ req })

    // if (!token) throw new UnauthorizedError()

    const fetchAllCategories = makeFetchAllCategoriesUseCase()

    const categories = await fetchAllCategories.execute()

    return NextResponse.json(categories, { status: 200 })
  } catch (err) {
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

    const createCategoryUseCase = makeCreateCategoryUseCase()

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
    if (err instanceof UnauthorizedError) {
      throw new UnauthorizedError()
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

    const updateCategoryUseCase = makeUpdateCategoryUseCase()

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
