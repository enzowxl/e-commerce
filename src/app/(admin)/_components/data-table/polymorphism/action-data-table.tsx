import { ButtonHTMLAttributes } from 'react'

import { ActionTypes, TableTypes } from '../container-data-table'
import { DeleteDialog } from '../dialogs/delete-dialog'
import { UpdateDialog } from '../dialogs/update-dialog'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  val: boolean
  updateVal: (val: boolean) => void
  tableType: TableTypes
  actionType: ActionTypes
}
export function ActionDataTableBody(props: ButtonProps) {
  const Component = props.actionType === 'update' ? UpdateDialog : DeleteDialog

  return <Component {...props}>{props.children}</Component>
}
