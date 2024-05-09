import { ButtonHTMLAttributes } from 'react'

import { TableTypes } from '../container-data-table'
import { FormUpdateCategory } from '../forms/form-update-category'
import { FormUpdateProduct } from '../forms/form-update-product'
import { FormUpdateUser } from '../forms/form-update-user'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tableType: TableTypes
}

export function FormUpdateDialog(props: ButtonProps) {
  const Component =
    props.tableType === 'user'
      ? FormUpdateUser
      : props.tableType === 'product'
        ? FormUpdateProduct
        : FormUpdateCategory

  return <Component {...props}>{props.children}</Component>
}
