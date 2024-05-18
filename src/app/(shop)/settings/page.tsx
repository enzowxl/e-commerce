import { Address } from '@prisma/client'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { BasePage } from '@/components/base-page'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { authOptions } from '@/utils/auth-options'

import { getMe } from '../_actions/get-me'
import { SettingsForm } from '../_components/settings/settings-form'

export default async function Settings() {
  const data = await getServerSession(authOptions)

  if (!data) {
    return notFound()
  }

  const userMe = await getMe(data?.user?.email as string)

  return (
    <BasePage title="Settings">
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex gap-5 justify-between items-center p-8 bg-color-secondary rounded-xl">
          <div className="flex items-center gap-3">
            <Avatar className="w-16 h-16">
              <AvatarImage src={data.user.image!} alt={data.user.name!} />
              <AvatarFallback>{data.user.name![0][0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-medium text-lg">{data.user.name}</h1>
              <span className="text-color-gray text-base">
                {data.user.email}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-10 p-8 bg-color-secondary rounded-xl">
          <h1 className="font-semibold text-xl">General information</h1>
          <SettingsForm user={data} address={userMe?.address as Address} />
        </div>
      </div>
    </BasePage>
  )
}
