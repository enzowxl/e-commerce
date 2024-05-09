import { ReactNode } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { TableTypes } from '../container-data-table'

export function DeleteDialog({
  children,
  val,
  updateVal,
  tableType,
}: {
  children: ReactNode
  val: boolean
  updateVal: (val: boolean) => void
  tableType: TableTypes
}) {
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
            <button
              type="submit"
              className="w-full bg-color-primary h-12 rounded-xl"
            >
              Delete
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
