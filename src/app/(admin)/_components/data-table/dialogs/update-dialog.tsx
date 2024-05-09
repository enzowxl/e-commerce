'use client'

import { ReactNode } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { TableTypes } from '../container-data-table'
import { FormUpdateDialog } from '../polymorphism/form-update-dialog'

export function UpdateDialog({
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
  return (
    <Dialog open={val} onOpenChange={updateVal}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] z-50">
        <DialogHeader>
          <DialogTitle>Edit {tableType}</DialogTitle>
        </DialogHeader>
        <FormUpdateDialog tableId={tableId} tableType={tableType} />
      </DialogContent>
    </Dialog>
  )
}
