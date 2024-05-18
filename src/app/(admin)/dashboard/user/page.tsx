import { getUsers } from '@/app/(shop)/_actions/get-users'
import { BasePage } from '@/components/base-page'

import { DataTableUsers } from '../../_components/data-table/tables/users-data-table'

export default async function DashboardUsers() {
  const allUsers = await getUsers()

  return (
    <BasePage className="px-0" classNameTitle="px-8" title="Users">
      <DataTableUsers data={allUsers} />
    </BasePage>
  )
}
