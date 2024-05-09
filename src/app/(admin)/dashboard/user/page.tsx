import { User } from '@prisma/client'
import { headers } from 'next/headers'

import { BasePage } from '@/components/base-page'
import { api } from '@/utils/api'

import { DataTableUsers } from '../../_components/data-table/tables/users-data-table'

async function getUsers(): Promise<User[]> {
  const response = await api('/auth/users', {
    method: 'GET',
    cache: 'no-cache',
    headers: headers(),
  })

  const { users } = (await response.json()) as { users: User[] }

  return users
}

export default async function DashboardUsers() {
  const users = await getUsers()

  return (
    <BasePage className="px-0" classNameTitle="px-5" title="Users">
      <DataTableUsers data={users} />
    </BasePage>
  )
}
