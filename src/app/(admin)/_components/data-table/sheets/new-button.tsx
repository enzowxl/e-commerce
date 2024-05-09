import { ButtonHTMLAttributes } from 'react'

import { TableTypes } from '../container-data-table'
import { NewCategorySheet } from './new-category-sheet'
import { NewProductSheet } from './new-product-sheet'
import { NewUserSheet } from './new-user-sheet'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tableType: TableTypes
}

export function NewButtonDataTableHeader(props: ButtonProps) {
  const Component =
    props.tableType === 'user'
      ? NewUserSheet
      : props.tableType === 'product'
        ? NewProductSheet
        : NewCategorySheet

  return <Component {...props}>{props.children}</Component>
}
