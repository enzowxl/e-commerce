import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z, ZodError } from 'zod'
import { zfd } from 'zod-form-data'

import { getUserPermissions } from '@/actions/get-user-permissions'
import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { UnauthorizedError } from '@/app/api/_errors/unauthorized-error'
import { UserNotExistsError } from '@/app/api/_errors/user-not-exists-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { makeCreateAddressUseCase } from '@/app/api/_use-cases/factories/make-create-address-use-case'
import { makeFetchUserUseCase } from '@/app/api/_use-cases/factories/make-fetch-user-use-case'
import { userSchema } from '@/auth/models/user'
import { authOptions } from '@/utils/auth-options'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) throw new UnauthorizedError()

    const { cannot } = await getUserPermissions(session?.user?.sub as string)

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

    const createAddressUseCase = makeCreateAddressUseCase()

    await createAddressUseCase.execute({
      email,
      address,
      number,
      city,
      state,
      zip: zipcode,
      complement,
      district,
    })

    return NextResponse.json({}, { status: 201 })
  } catch (err) {
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
