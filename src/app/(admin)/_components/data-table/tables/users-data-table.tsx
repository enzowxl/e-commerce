'use client'

import { User } from '@prisma/client'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import { Ellipsis, Pencil, Trash2 } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { DataTableContainer } from '../container-data-table'
export function DataTableUsers({ data }: { data: User[] }) {
  const columns: ColumnDef<unknown>[] = [
    {
      accessorKey: 'id',
      header: () => <div className="pl-5">Id</div>,
      cell: ({ row }) => (
        <div className="capitalize pl-5">{row.getValue('id')}</div>
      ),
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: () => <div>Email</div>,
      cell: ({ row }) => <div>{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'role',
      header: () => <div>Role</div>,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('role')}</div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: () => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="outline-none h-6 w-8 rounded p-0 border-color-secondary"
              >
                <Ellipsis className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-3 items-center w-full">
                <Pencil className="w-5 h-5" />
                Update
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-3 items-center w-full">
                <Trash2 className="w-5 h-5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return <DataTableContainer type="user" data={data} columns={columns} />
}
