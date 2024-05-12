import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z, ZodError } from 'zod'
import { zfd } from 'zod-form-data'

import { getUserPermissions } from '@/actions/get-user-permissions'
import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { CategoryAlreadyExistsError } from '@/app/api/_errors/category-already.exists-error'
import { CategoryNotExistsError } from '@/app/api/_errors/category-not-exists-error'
import { UnauthorizedError } from '@/app/api/_errors/unauthorized-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { makeCreateCategoryUseCase } from '@/app/api/_use-cases/factories/make-create-category-use-case'
import { makeFetchAllCategoriesUseCase } from '@/app/api/_use-cases/factories/make-fetch-all-categories-use-case'
import { makeUpdateCategoryUseCase } from '@/app/api/_use-cases/factories/make-update-category-use-case'
import { createSlug } from '@/utils/create-slug'

export async function GET() {
  try {
    const fetchAllCategories = makeFetchAllCategoriesUseCase()

    const categories = await fetchAllCategories.execute()

    return NextResponse.json(categories, { status: 200 })
  } catch (err) {
    return new BadRequestError().error()
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token) throw new UnauthorizedError()

    const { cannot } = await getUserPermissions(token.sub as string)

    if (cannot('create', 'Category')) throw new UnauthorizedError()

    const categoryRequestSchema = zfd
      .formData({
        name: z.string(),
        photo: z.instanceof(File).optional(),
      })
      .parseAsync(await req.formData())

    const { name, photo } = await categoryRequestSchema

    const createCategoryUseCase = makeCreateCategoryUseCase()

    await createCategoryUseCase.execute({
      name,
      photo,
      slug: createSlug(name),
    })

    return NextResponse.json({}, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError().error()
    }
    if (err instanceof CategoryAlreadyExistsError) {
      return new CategoryAlreadyExistsError().error()
    }
    if (err instanceof UnauthorizedError) {
      return new UnauthorizedError().error()
    }
    return new BadRequestError().error()
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token) throw new UnauthorizedError()

    const { cannot } = await getUserPermissions(token.sub as string)

    if (cannot('update', 'Category')) throw new UnauthorizedError()

    const categoryRequestSchema = zfd
      .formData({
        slug: z.string(),
        name: z.string().optional(),
        photo: z.instanceof(File).optional(),
      })
      .parseAsync(await req.formData())

    const { slug, name, photo } = await categoryRequestSchema

    const updateCategoryUseCase = makeUpdateCategoryUseCase()

    await updateCategoryUseCase.execute({
      slug,
      photo,
      data: {
        name,
      },
    })
    return NextResponse.json({}, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) {
      return new ValidationError().error()
    }
    if (err instanceof CategoryNotExistsError) {
      return new CategoryNotExistsError().error()
    }
    if (err instanceof UnauthorizedError) {
      return new UnauthorizedError().error()
    }
    return new BadRequestError().error()
  }
}
