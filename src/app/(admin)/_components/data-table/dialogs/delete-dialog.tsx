import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { api } from '@/utils/api'

import { TableTypes } from '../container-data-table'

export function DeleteDialog({
  children,
  val,
  updateVal,
  tableType,
  tableId,
}: {
  children: ReactNode
  val: boolean
  updateVal: (val: boolean) => void
  tableType: TableTypes
  tableId: string
}) {
  const router = useRouter()

  async function deleteColumn() {
    switch (tableType) {
      case 'user':
        await api(`/auth/users/${tableId}`, {
          method: 'DELETE',
        })

        router.refresh()
        break
      case 'product':
        await api(`/product/${tableId}`, {
          method: 'DELETE',
        })

        router.refresh()
        break

      case 'category':
        await api(`/category/${tableId}`, {
          method: 'DELETE',
        })

        router.refresh()
        break
    }
  }

  return (
    <Dialog open={val} onOpenChange={updateVal}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete {tableType}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-8 max-sm:text-center">
          Are you sure you want to delete a {tableType}?
          <div className="w-full flex flex-col gap-8">
            <DialogClose
              onClick={deleteColumn}
              type="submit"
              className="text-white w-full bg-color-primary h-12 rounded-xl"
            >
              Delete
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
