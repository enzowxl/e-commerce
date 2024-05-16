import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z, ZodError } from 'zod'
import { zfd } from 'zod-form-data'

import { getUserPermissions } from '@/actions/get-user-permissions'
import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { UnauthorizedError } from '@/app/api/_errors/unauthorized-error'
import { UserNotExistsError } from '@/app/api/_errors/user-not-exists-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { makeFetchUserUseCase } from '@/app/api/_use-cases/factories/make-fetch-user-use-case'
import { userSchema } from '@/auth/models/user'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token) throw new UnauthorizedError()

    const { cannot } = await getUserPermissions(token.sub as string)

    const addressRequestSchema = zfd
      .formData({
        email: z.string().email(),
        address: z.string().min(3).max(50),
        number: z.string().transform((value) => Number(value)),
        city: z.string().min(3).max(50),
        state: z.string().min(2),
        zipcode: z.string().regex(/^\d{5}-\d{3}$/),
        district: z.string().min(3).max(50),
        complement: z.string().min(3).max(50).optional(),
      })
      .parseAsync(await req.formData())

    const {
      city,
      number,
      state,
      address,
      zipcode,
      complement,
      district,
      email,
    } = await addressRequestSchema

    const fetchUserUseCase = makeFetchUserUseCase()

    const { user } = await fetchUserUseCase.execute({ email })

    const authUser = userSchema.parse(user)

    if (cannot('update', authUser)) throw new UnauthorizedError()

    const addressByUserEmail = await prisma.address.findFirst({
      where: {
        user: {
          some: {
            email,
          },
        },
      },
    })

    if (!addressByUserEmail) {
      await prisma.address.create({
        data: {
          address,
          number,
          city,
          state,
          zip: zipcode,
          complement,
          district,
          user: {
            connect: {
              email,
            },
          },
        },
      })
    } else {
      await prisma.address.update({
        where: {
          id: addressByUserEmail.id,
        },
        data: {
          address,
          number,
          city,
          state,
          zip: zipcode,
          complement,
          district,
        },
      })
    }

    return NextResponse.json({}, { status: 200 })
  } catch (err) {
    console.log(err)
    if (err instanceof ZodError) {
      return new ValidationError().error()
    }
    if (err instanceof UserNotExistsError) {
      return new UserNotExistsError().error()
    }
    if (err instanceof UnauthorizedError) {
      return new UnauthorizedError().error()
    }
    return new BadRequestError().error()
  }
}
