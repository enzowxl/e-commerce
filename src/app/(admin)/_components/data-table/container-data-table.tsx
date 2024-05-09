'use client'

import { Category, Product, User } from '@prisma/client'
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import * as React from 'react'

import { DataTableBody } from './body-data-table'
import { DataTableHeader } from './header-data-table'
import { TablePagination } from './pagination-data-table'

export type TableTypes = 'product' | 'user' | 'category'

export function DataTableContainer({
  data,
  columns,
  type,
}: {
  data: Product[] | User[] | Category[]
  columns: ColumnDef<unknown>[]
  type: TableTypes
}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full flex flex-col gap-4">
      <DataTableHeader type={type} table={table} />

      <DataTableBody table={table} columns={columns} />

      <TablePagination table={table} />
    </div>
  )
}
