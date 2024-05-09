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
          <DialogTitle>Edit {tableType}</DialogTitle>
        </DialogHeader>
        <FormUpdateDialog tableType={tableType} />
      </DialogContent>
    </Dialog>
  )
}
