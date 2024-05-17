import { UserNotExistsError } from '@/app/api/_errors/user-not-exists-error'
import { defineAbilityFor } from '@/auth'
import { userSchema } from '@/auth/models/user'
import { prisma } from '@/lib/prisma'

export async function getUserPermissions(userId: string) {
  const findUserById = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })

  if (!findUserById) throw new UserNotExistsError()

  const authUser = userSchema.parse({
    id: userId,
    role: findUserById?.role,
  })

  const ability = defineAbilityFor(authUser)

  return ability
}
