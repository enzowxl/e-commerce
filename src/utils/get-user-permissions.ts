import { UserNotExistsError } from '@/app/api/_errors/user-not-exists-error'
import { defineAbilityFor } from '@/auth'
import { userSchema } from '@/auth/models/user'
import { prisma } from '@/lib/prisma'

export async function getUserPermissions(userId: string) {
  const userDb = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!userDb) throw new UserNotExistsError()

  const authUser = userSchema.parse({
    id: userId,
    role: userDb?.role,
  })

  const ability = defineAbilityFor(authUser)

  return ability
}
