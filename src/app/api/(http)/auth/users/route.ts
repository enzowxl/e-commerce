import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z, ZodError } from 'zod'

import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { UnauthorizedError } from '@/app/api/_errors/unauthorized-error'
import { UserAlreadyExistsError } from '@/app/api/_errors/user-already-exists-error'
import { UserNotExistsError } from '@/app/api/_errors/user-not-exists-error'
import { ValidationError } from '@/app/api/_errors/validation-error'
import { PrismaUserRepository } from '@/app/api/_repository/prisma/prisma-users-repository'
import { FetchAllUsersUseCase } from '@/app/api/_use-cases/fetch-all-users'
import { FetchUserUseCase } from '@/app/api/_use-cases/fetch-user'
import { RegisterUseCase } from '@/app/api/_use-cases/register'
import { UpdateUserUseCase } from '@/app/api/_use-cases/update-user'
import { userSchema } from '@/auth/models/user'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token) throw new UnauthorizedError()

    const { cannot } = await getUserPermissions(token.sub as string)

    if (cannot('manage', 'all')) throw new UnauthorizedError()

    const usersRepository = new PrismaUserRepository()
    const fetchAllUsers = new FetchAllUsersUseCase(usersRepository)

    const users = await fetchAllUsers.execute()

    return NextResponse.json(users, { status: 200 })
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      throw new UnauthorizedError()
    }
    throw new BadRequestError()
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

    const usersRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({ name, email, password })

    return NextResponse.json({}, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError()
    }
    if (err instanceof UserAlreadyExistsError) {
      throw new UserAlreadyExistsError()
    }
    throw new BadRequestError()
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
        avatarUrl: z.string().url().optional(),
      })
      .parseAsync(await req.json())

    const { name, email, newEmail, password, avatarUrl } =
      await userRequestSchema

    const usersRepository = new PrismaUserRepository()
    const fetchUserUseCase = new FetchUserUseCase(usersRepository)
    const updateUserUseCase = new UpdateUserUseCase(usersRepository)

    const { user } = await fetchUserUseCase.execute({ email })

    const authUser = userSchema.parse(user)

    if (cannot('update', authUser)) throw new UnauthorizedError()

    await updateUserUseCase.execute({
      email,
      data: {
        name,
        email: newEmail,
        passwordHash: password,
        avatarUrl,
      },
    })

    return NextResponse.json({}, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError()
    }
    if (err instanceof UserAlreadyExistsError) {
      throw new UserAlreadyExistsError()
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
