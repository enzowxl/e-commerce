import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z, ZodError } from 'zod'

import { getUserPermissions } from '@/actions/get-user-permissions'
import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { UnauthorizedError } from '@/app/api/_errors/unauthorized-error'
import { UserAlreadyExistsError } from '@/app/api/_errors/user-already-exists-error'
import { UserNotExistsError } from '@/app/api/_errors/user-not-exists-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { makeFetchAllUsersUseCase } from '@/app/api/_use-cases/factories/make-fetch-all-users-use-case'
import { makeFetchUserUseCase } from '@/app/api/_use-cases/factories/make-fetch-user-use-case'
import { makeRegisterUseCase } from '@/app/api/_use-cases/factories/make-register-use-case'
import { makeUpdateUserUseCase } from '@/app/api/_use-cases/factories/make-update-user-use-case'
import { userSchema } from '@/auth/models/user'

const RoleTypes = ['ADMIN', 'MEMBER'] as const

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token) throw new UnauthorizedError()

    const { cannot } = await getUserPermissions(token.sub as string)

    if (cannot('manage', 'all')) throw new UnauthorizedError()

    const fetchAllUsers = makeFetchAllUsersUseCase()

    const users = await fetchAllUsers.execute()

    return NextResponse.json(users, { status: 200 })
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return new UnauthorizedError().error()
    }
    return new BadRequestError().error()
  }
}

export async function POST(req: NextRequest) {
  try {
    const userRequestSchema = z
      .object({
        name: z.string().min(4).max(255),
        email: z.string().email(),
        password: z.string().min(8),
      })
      .parseAsync(await req.json())

    const { name, email, password } = await userRequestSchema

    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ name, email, password })

    return NextResponse.json({}, { status: 201 })
  } catch (err) {
    console.log(err)
    if (err instanceof ZodError) {
      return new ValidationError().error()
    }
    if (err instanceof UserAlreadyExistsError) {
      return new UserAlreadyExistsError().error()
    }
    return new BadRequestError().error()
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token) throw new UnauthorizedError()

    const { cannot } = await getUserPermissions(token.sub as string)

    const userRequestSchema = z
      .object({
        email: z.string().email(),
        name: z.string().min(4).max(255).optional(),
        newEmail: z.string().email().optional(),
        password: z.string().min(8).optional(),
        photoUrl: z.string().url().optional(),
        role: z.enum(RoleTypes).optional(),
      })
      .parseAsync(await req.json())

    const { name, email, newEmail, password, photoUrl, role } =
      await userRequestSchema

    const fetchUserUseCase = makeFetchUserUseCase()
    const updateUserUseCase = makeUpdateUserUseCase()

    const { user } = await fetchUserUseCase.execute({ email })

    const authUser = userSchema.parse(user)

    if (cannot('update', authUser)) throw new UnauthorizedError()

    await updateUserUseCase.execute({
      email,
      data: {
        name,
        email: newEmail,
        passwordHash: password,
        photoUrl,
        role,
      },
    })

    return NextResponse.json({}, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) {
      return new ValidationError().error()
    }
    if (err instanceof UserAlreadyExistsError) {
      return new UserAlreadyExistsError().error()
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
