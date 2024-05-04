import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z, ZodError } from 'zod'

import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { UnauthorizedError } from '@/app/api/_errors/unauthorized-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { createSlug } from '@/utils/create-slug'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { CategoryNotExistsError } from '../../_errors/category-not-exists-error'
import { ProductAlreadyExistsError } from '../../_errors/product-already-exists-error'
import { ProductNotExistsError } from '../../_errors/product-not-exists-error'
import { makeCreateProductUseCase } from '../../_use-cases/factories/make-create-product-use-case'
import { makeFetchAllProductsUseCase } from '../../_use-cases/factories/make-fetch-all-products-use-case'
import { makeUpdateProductUseCase } from '../../_use-cases/factories/make-update-product-use-case'

const ProductTypes = ['T_SHIRT', 'SHORTS', 'SHIRTS', 'HOODIE', 'JEANS'] as const

export async function GET() {
  try {
    // const token = await getToken({ req })

    // if (!token) throw new UnauthorizedError()

    const fetchAllProducts = makeFetchAllProductsUseCase()

    const products = await fetchAllProducts.execute()

    return NextResponse.json(products, { status: 200 })
  } catch (err) {
    throw new BadRequestError()
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token) throw new UnauthorizedError()

    const { cannot } = await getUserPermissions(token.sub as string)

    if (cannot('create', 'Product')) throw new UnauthorizedError()

    const productRequestSchema = z
      .object({
        name: z.string(),
        price: z.number().int(),
        type: z.enum(ProductTypes),
        description: z.string(),
        categorySlug: z.string(),
        avatarUrl: z.string().optional(),
        discount: z.number().int().optional(),
        sizes: z.string().array().optional(),
        colors: z.string().array().optional(),
        photos: z.string().array().optional(),
      })
      .parseAsync(await req.json())

    const {
      name,
      price,
      type,
      discount,
      description,
      avatarUrl,
      categorySlug,
      sizes,
      colors,
      photos,
    } = await productRequestSchema

    const createProductUseCase = makeCreateProductUseCase()

    await createProductUseCase.execute({
      categorySlug,
      name,
      price,
      type,
      discount,
      description,
      avatarUrl,
      sizes,
      colors,
      photos,
      slug: createSlug(name),
    })

    return NextResponse.json({}, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError()
    }
    if (err instanceof CategoryNotExistsError) {
      throw new CategoryNotExistsError()
    }
    if (err instanceof ProductAlreadyExistsError) {
      throw new ProductAlreadyExistsError()
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

    if (cannot('update', 'Product')) throw new UnauthorizedError()

    const productRequestSchema = z
      .object({
        slug: z.string(),
        name: z.string(),
        price: z.number().int(),
        type: z.enum(ProductTypes),
        description: z.string(),
        avatarUrl: z.string().optional(),
        discount: z.number().int().optional(),
        sizes: z.string().array().optional(),
        colors: z.string().array().optional(),
        photos: z.string().array().optional(),
      })
      .parseAsync(await req.json())
    const {
      slug,
      name,
      price,
      type,
      discount,
      description,
      avatarUrl,
      colors,
      photos,
      sizes,
    } = await productRequestSchema

    const updateProductUseCase = makeUpdateProductUseCase()

    await updateProductUseCase.execute({
      slug,
      data: {
        name,
        price,
        type,
        discount,
        description,
        avatarUrl,
        colors,
        photos,
        sizes,
      },
    })
    return NextResponse.json({}, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError()
    }
    if (err instanceof ProductNotExistsError) {
      throw new ProductNotExistsError()
    }
    if (err instanceof UnauthorizedError) {
      throw new UnauthorizedError()
    }
    throw new BadRequestError()
  }
}
