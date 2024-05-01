import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z, ZodError } from 'zod'

import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { UnauthorizedError } from '@/app/api/_errors/unauthorized-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { PrismaProductsRepository } from '@/app/api/_repository/prisma/prisma-products-repository'
import { CreateProductUseCase } from '@/app/api/_use-cases/create-product'
import { createSlug } from '@/utils/create-slug'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { ProductAlreadyExistsError } from '../../_errors/product-already-exists-error'
import { ProductNotExistsError } from '../../_errors/product-not-exists-error'
import { UpdateProductUseCase } from '../../_use-cases/update-product'

const ProductType = ['TSHIRT', 'SHORTS', 'SHIRTS', 'HOODIE', 'JEANS'] as const

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
        type: z.enum(ProductType),
        description: z.string(),
        avatarUrl: z.string().optional(),
        discount: z.number().int().optional(),
      })
      .parseAsync(await req.json())

    const { name, price, type, discount, description, avatarUrl } =
      await productRequestSchema

    const productsRepository = new PrismaProductsRepository()
    const createProductUseCase = new CreateProductUseCase(productsRepository)

    await createProductUseCase.execute({
      name,
      price,
      type,
      discount,
      description,
      avatarUrl,
      slug: createSlug(name),
    })

    return NextResponse.json({}, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError()
    }
    if (err instanceof ProductAlreadyExistsError) {
      throw new ProductAlreadyExistsError()
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
        name: z.string().optional(),
        price: z.number().int().optional(),
        type: z.enum(ProductType).optional(),
        description: z.string().optional(),
        avatarUrl: z.string().optional(),
        discount: z.number().int().optional(),
      })
      .parseAsync(await req.json())
    const { slug, name, price, type, discount, description, avatarUrl } =
      await productRequestSchema

    const productsRepository = new PrismaProductsRepository()
    const updateProductUseCase = new UpdateProductUseCase(productsRepository)

    await updateProductUseCase.execute({
      slug,
      data: {
        name,
        price,
        type,
        discount,
        description,
        avatarUrl,
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
