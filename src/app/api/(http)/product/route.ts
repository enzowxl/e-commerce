import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z, ZodError } from 'zod'
import { zfd } from 'zod-form-data'

import { getUserPermissions } from '@/actions/get-user-permissions'
import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { CategoryNotExistsError } from '@/app/api/_errors/category-not-exists-error'
import { ProductAlreadyExistsError } from '@/app/api/_errors/product-already-exists-error'
import { ProductNotExistsError } from '@/app/api/_errors/product-not-exists-error'
import { UnauthorizedError } from '@/app/api/_errors/unauthorized-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { makeCreateProductUseCase } from '@/app/api/_use-cases/factories/make-create-product-use-case'
import { makeFetchAllProductsUseCase } from '@/app/api/_use-cases/factories/make-fetch-all-products-use-case'
import { makeUpdateProductUseCase } from '@/app/api/_use-cases/factories/make-update-product-use-case'
import { createSlug } from '@/utils/create-slug'

export const ProductTypes = [
  'T_SHIRT',
  'SHORTS',
  'SHIRTS',
  'HOODIE',
  'JEANS',
] as const

export async function GET() {
  try {
    const fetchAllProducts = makeFetchAllProductsUseCase()

    const products = await fetchAllProducts.execute()

    return NextResponse.json(products, { status: 200 })
  } catch (err) {
    return new BadRequestError().error()
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token) throw new UnauthorizedError()

    const { cannot } = await getUserPermissions(token.sub as string)

    if (cannot('create', 'Product')) throw new UnauthorizedError()

    const stringToNull = (value: string): string | null => {
      return value.trim() === '' ? null : value
    }

    const productRequestSchema = zfd
      .formData({
        name: z.string(),
        price: z.string(),
        description: z.string().transform(stringToNull).optional(),
        categorySlug: z.string().transform(stringToNull).optional(),
        photo: z.instanceof(File).optional(),
        discount: z.string().optional(),
        sizes: z.string().array().optional(),
        colors: z.string().array().optional(),
      })
      .parseAsync(await req.formData())

    const {
      name,
      price: priceRequest,
      discount: discountRequest,
      description,
      photo,
      categorySlug,
      sizes,
      colors,
    } = await productRequestSchema

    const itemsNumberSchema = z
      .object({
        price: z.number(),
        discount: z.number().int(),
      })
      .parse({
        price: Number(priceRequest),
        discount: Number(discountRequest),
      })

    const { price, discount } = itemsNumberSchema

    const createProductUseCase = makeCreateProductUseCase()

    await createProductUseCase.execute({
      name,
      discount,
      description,
      sizes,
      colors,
      photo,
      categorySlug,
      price: Number(price),
      slug: createSlug(name),
    })

    return NextResponse.json({}, { status: 201 })
  } catch (err) {
    console.log(err)
    if (err instanceof ZodError) {
      return new ValidationError().error()
    }
    if (err instanceof CategoryNotExistsError) {
      return new CategoryNotExistsError().error()
    }
    if (err instanceof ProductAlreadyExistsError) {
      return new ProductAlreadyExistsError().error()
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

    if (cannot('update', 'Product')) throw new UnauthorizedError()

    const productRequestSchema = z
      .object({
        slug: z.string(),
        name: z.string().optional(),
        price: z.number().int().optional(),
        description: z.string().optional(),
        type: z.enum(ProductTypes).optional(),
        photoUrl: z.string().optional(),
        discount: z.number().int().optional(),
        sizes: z.string().array().optional(),
        colors: z.string().array().optional(),
      })
      .parseAsync(await req.json())
    const {
      slug,
      name,
      price,
      type,
      discount,
      description,
      photoUrl,
      colors,
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
        photoUrl,
        colors,
        sizes,
      },
    })
    return NextResponse.json({}, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) {
      return new ValidationError().error()
    }
    if (err instanceof ProductNotExistsError) {
      return new ProductNotExistsError().error()
    }
    if (err instanceof UnauthorizedError) {
      return new UnauthorizedError().error()
    }
    return new BadRequestError().error()
  }
}
