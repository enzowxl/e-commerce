// import { Category } from '@prisma/client'
// import { ButtonHTMLAttributes } from 'react'

// import { TableTypes } from '../container-data-table'
// import { NewCategorySheet } from '../sheets/new-category-sheet'
// import { NewProductSheet } from '../sheets/new-product-sheet'
// import { NewUserSheet } from '../sheets/new-user-sheet'

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   tableType: TableTypes
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   complementCategoryData?: Category[]
// }

// export function NewButtonDataTableHeader(props: ButtonProps) {
//   const Component =
//     props.tableType === 'user'
//       ? NewUserSheet
//       : props.tableType === 'product'
//         ? NewProductSheet
//         : props.tableType === 'category'
//           ? NewCategorySheet
//           : 'button'

//   return <Component {...props}>{props.children}</Component>
// }
