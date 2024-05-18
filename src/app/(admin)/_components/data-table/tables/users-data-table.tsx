// 'use client'

// import { User } from '@prisma/client'
// import { CaretSortIcon } from '@radix-ui/react-icons'
// import { ColumnDef } from '@tanstack/react-table'
// import { Ellipsis, Pencil, Trash2 } from 'lucide-react'
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

// import { DataTableContainer } from '../container-data-table'
// import { DeleteUserDialog } from '../dialogs/delete-user-dialog'
// import { UpdateUserDialog } from '../dialogs/update-user-dialog'

// export function DataTableUsers({ data }: { data: User[] }) {
//   const [updateDialog, updateUpdateDialog] = React.useState(false)
//   const [deleteDialog, updateDeleteDialog] = React.useState(false)
//   const [emailDialog, updateEmailDialog] = React.useState('')

//   const columns: ColumnDef<unknown>[] = [
//     {
//       accessorKey: 'name',
//       header: ({ column }) => {
//         return (
//           <Button
//             variant="ghost"
//             className="p-0 hover:bg-transparent pl-5"
//             onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//           >
//             Name
//             <CaretSortIcon className="ml-2 h-4 w-4" />
//           </Button>
//         )
//       },
//       cell: ({ row }) => (
//         <div className="capitalize pl-5">{row.getValue('name')}</div>
//       ),
//     },
//     {
//       accessorKey: 'email',
//       header: () => <div>Email</div>,
//       cell: ({ row }) => <div>{row.getValue('email')}</div>,
//     },
//     {
//       accessorKey: 'role',
//       header: () => <div>Role</div>,
//       cell: ({ row }) => (
//         <div className="capitalize">{row.getValue('role')}</div>
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
//                   updateEmailDialog(row?.original.email)
//                   updateUpdateDialog(!updateDialog)
//                 }}
//                 className="flex gap-3 items-center w-full"
//               >
//                 <Pencil className="w-5 h-5" />
//                 Update
//               </DropdownMenuItem>

//               <DropdownMenuItem
//                 onClick={() => {
//                   updateEmailDialog(row?.original.email)
//                   updateDeleteDialog(!deleteDialog)
//                 }}
//                 className="flex gap-3 items-center w-full"
//               >
//                 <Trash2 className="w-5 h-5" />
//                 Delete
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//             {deleteDialog && (
//               <DeleteUserDialog
//                 email={emailDialog}
//                 open={deleteDialog}
//                 onOpenChange={updateDeleteDialog}
//               />
//             )}
//             {updateDialog && (
//               <UpdateUserDialog
//                 email={emailDialog}
//                 open={updateDialog}
//                 onOpenChange={updateUpdateDialog}
//               />
//             )}
//           </DropdownMenu>
//         )
//       },
//     },
//   ]

//   return <DataTableContainer type="user" data={data} columns={columns} />
// }
