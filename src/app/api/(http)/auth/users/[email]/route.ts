import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z, ZodError } from 'zod'

import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { UnauthorizedError } from '@/app/api/_errors/unauthorized-error'
import { UserNotExistsError } from '@/app/api/_errors/user-not-exists-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { makeDeleteUserUseCase } from '@/app/api/_use-cases/factories/make-delete-user-use-case'
import { makeFetchUserUseCase } from '@/app/api/_use-cases/factories/make-fetch-user-use-case'
import { userSchema } from '@/auth/models/user'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } },
) {
  try {
    const token = await getToken({ req })

    if (!token) throw new UnauthorizedError()

    const { cannot } = await getUserPermissions(token.sub as string)

    const userParamsSchema = z
      .object({
        email: z.string().email(),
      })
      .parse(params)

    const { email } = userParamsSchema

    const fetchUserUseCase = makeFetchUserUseCase()

    const user = await fetchUserUseCase.execute({ email })

    const authUser = userSchema.parse(user.user)

    if (cannot('get', authUser)) throw new UnauthorizedError()

    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError()
    }
    if (err instanceof UserNotExistsError) {
      throw new UserNotExistsError()
    }
    if (err instanceof UnauthorizedError) {
      throw new UnauthorizedError()
    }
    throw new BadRequestError()
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { email: string } },
) {
  try {
    const token = await getToken({ req })

    if (!token) throw new UnauthorizedError()

    const { cannot } = await getUserPermissions(token.sub as string)

    const fetchUserUseCase = makeFetchUserUseCase()
    const deleteUserUseCase = makeDeleteUserUseCase()

    const { user } = await fetchUserUseCase.execute({ email: params.email })

    const authUser = userSchema.parse(user)

    if (cannot('delete', authUser)) throw new UnauthorizedError()

    const userParamsSchema = z
      .object({
        email: z.string().email(),
      })
      .parse(params)

    const { email } = userParamsSchema

    await deleteUserUseCase.execute({ email })

    return NextResponse.json({}, { status: 200 })
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError()
    }
    if (err instanceof UserNotExistsError) {
      throw new UserNotExistsError()
    }
    if (err instanceof UnauthorizedError) {
      throw new UnauthorizedError()
    }
    throw new BadRequestError()
  }
}
