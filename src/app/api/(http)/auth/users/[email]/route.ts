import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z, ZodError } from 'zod'

import { getUserPermissions } from '@/actions/get-user-permissions'
import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { UnauthorizedError } from '@/app/api/_errors/unauthorized-error'
import { UserNotExistsError } from '@/app/api/_errors/user-not-exists-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { makeDeleteUserUseCase } from '@/app/api/_use-cases/factories/make-delete-user-use-case'
import { makeFetchUserUseCase } from '@/app/api/_use-cases/factories/make-fetch-user-use-case'
import { userSchema } from '@/auth/models/user'
import { authOptions } from '@/utils/auth-options'

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } },
) {
  try {
    const session = await getServerSession(authOptions)

    const { cannot } = await getUserPermissions(session?.user?.sub as string)

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { email: string } },
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) throw new UnauthorizedError()

    const { cannot } = await getUserPermissions(session?.user?.sub as string)

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
