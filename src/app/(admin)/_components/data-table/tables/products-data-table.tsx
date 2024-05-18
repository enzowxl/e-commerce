// 'use client'

// import { Category, Product } from '@prisma/client'
// import { CaretSortIcon } from '@radix-ui/react-icons'
// import { ColumnDef } from '@tanstack/react-table'
// import { Ellipsis, Pencil, Trash2 } from 'lucide-react'
// import Link from 'next/link'
// import * as React from 'react'

// import { Button } from '@/components/ui/button'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { formatPrice } from '@/utils/format-price'

// import { DataTableContainer } from '../container-data-table'
// import { DeleteProductDialog } from '../dialogs/delete-product-dialog'
// import { UpdateProductDialog } from '../dialogs/update-product-dialog'

// export function DataTableProducts({
//   data,
//   complementCategoryData,
// }: {
//   data: Product[]
//   complementCategoryData?: Category[]
// }) {
//   const [updateDialog, updateUpdateDialog] = React.useState(false)
//   const [deleteDialog, updateDeleteDialog] = React.useState(false)
//   const [slugDialog, updateSlugDialog] = React.useState('')

//   const columns: ColumnDef<unknown>[] = [
//     {
//       accessorKey: 'slug',
//       header: () => <div className="pl-5">Slug</div>,
//       cell: ({ row }) => <div className="pl-5">{row.getValue('slug')}</div>,
//     },
//     {
//       accessorKey: 'name',
//       header: ({ column }) => {
//         return (
//           <Button
//             variant="ghost"
//             className="p-0 hover:bg-transparent"
//             onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//           >
//             Name
//             <CaretSortIcon className="ml-2 h-4 w-4" />
//           </Button>
//         )
//       },
//       cell: ({ row }) => (
//         <div className="capitalize">{row.getValue('name')}</div>
//       ),
//     },
//     {
//       accessorKey: 'price',
//       header: () => <div>Price</div>,
//       cell: ({ row }) => <div>{formatPrice(row.getValue('price'))}</div>,
//     },
//     {
//       accessorKey: 'photoUrl',
//       header: () => <div>Photo</div>,
//       cell: ({ row }) => (
//         <>
//           {row.getValue('photoUrl') ? (
//             <Link
//               className="underline"
//               target="_blank"
//               href={row.getValue('photoUrl')}
//             >
//               Visit
//             </Link>
//           ) : (
//             <div>Does not have</div>
//           )}
//         </>
//       ),
//     },
//     {
//       accessorKey: 'categorySlug',
//       header: () => <div>Category</div>,
//       cell: ({ row }) => (
//         <>
//           {row.getValue('categorySlug') ? (
//             <div>
//               {String(row.getValue('categorySlug'))[0].toUpperCase() +
//                 String(row.getValue('categorySlug')).slice(1)}
//             </div>
//           ) : (
//             <div>Does not have</div>
//           )}
//         </>
//       ),
//     },
//     {
//       id: 'actions',
//       enableHiding: false,
//       cell: ({ row }) => {
//         return (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="outline"
//                 className="outline-none h-6 w-8 rounded p-0 border-color-secondary"
//               >
//                 <Ellipsis className="w-5 h-5" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>Actions</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem
//                 onClick={() => {
//                   updateSlugDialog(row.original.slug)
//                   updateUpdateDialog(!updateDialog)
//                 }}
//                 className="flex gap-3 items-center w-full"
//               >
//                 <Pencil className="w-5 h-5" />
//                 Update
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onClick={() => {
//                   updateSlugDialog(row.original.slug)
//                   updateDeleteDialog(!deleteDialog)
//                 }}
//                 className="flex gap-3 items-center w-full"
//               >
//                 <Trash2 className="w-5 h-5" />
//                 Delete
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//             {deleteDialog && (
//               <DeleteProductDialog
//                 slug={slugDialog}
//                 open={deleteDialog}
//                 onOpenChange={updateDeleteDialog}
//               />
//             )}
//             {updateDialog && (
//               <UpdateProductDialog
//                 complementCategoryData={complementCategoryData}
//                 data={data}
//                 slug={slugDialog}
//                 open={updateDialog}
//                 onOpenChange={updateUpdateDialog}
//               />
//             )}
//           </DropdownMenu>
//         )
//       },
//     },
//   ]

//   return (
//     <DataTableContainer
//       complementCategoryData={complementCategoryData}
//       type="product"
//       data={data}
//       columns={columns}
//     />
//   )
// }
