// // import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
// // import { Table } from '@tanstack/react-table'

// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from '@/components/ui/select'

// // interface DataTablePaginationProps<TData> {
// //   table: Table<TData>
// // }

// export function TablePagination<TData>() {
//   // {
//   //   // table,
//   // }: DataTablePaginationProps<TData>,
//   return (
//     <div className="flex items-center px-8">
//       {/* <div className="flex items-center space-x-6 lg:space-x-8 justify-between w-full">
//         <div className="flex items-center">
//           <div className="flex items-center space-x-2">
//             <p className="text-sm font-medium max-sm:hidden">Rows per page</p>
//             <Select
//               value={`${table.getState().pagination.pageSize}`}
//               onValueChange={(value: string) => {
//                 table.setPageSize(Number(value))
//               }}
//             >
//               <SelectTrigger className="h-8 w-[70px] rounded-xl">
//                 <SelectValue
//                   placeholder={table.getState().pagination.pageSize}
//                 />
//               </SelectTrigger>
//               <SelectContent side="top" className="bg-color-secondary">
//                 {[10, 20, 30, 40, 50].map((pageSize) => (
//                   <SelectItem key={pageSize} value={`${pageSize}`}>
//                     {pageSize}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="max-sm:hidden flex w-[100px] items-center justify-center text-sm font-medium">
//             Page {table.getState().pagination.pageIndex + 1} of{' '}
//             {table.getPageCount()}
//           </div>
//         </div>
//         <div className="flex items-center space-x-2">
//           <button
//             className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer h-8 w-8 bg-color-primary flex items-center justify-center rounded"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             <ChevronLeftIcon className="h-5 w-5" />
//           </button>
//           <button
//             className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer h-8 w-8 bg-color-primary flex items-center justify-center rounded"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             <ChevronRightIcon className="h-5 w-5" />
//           </button>
//         </div>
//       </div> */}
//     </div>
//   )
// }
