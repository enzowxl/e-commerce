'use client'

import { Table } from '@tanstack/react-table'
import { Plus, Search } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { TableTypes } from './container-data-table'
import { NewButtonDataTableHeader } from './new-button-header-data-table'

export function DataTableHeader({
  table,
  type,
}: {
  table: Table<unknown>
  type: TableTypes
}) {
  return (
    <div className="flex items-center px-8 gap-10">
      <form className="flex max-w-sm items-center gap-3 rounded-xl bg-zinc-900 px-5 py-3">
        <Search className="w-5 h-5 text-zinc-500" />

        <Input
          placeholder={`Search ${type}`}
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500 border-0"
        />
      </form>
      <NewButtonDataTableHeader tableType={type}>
        <Button className="ml-auto bg-color-primary text-white py-5 rounded-xl flex gap-2">
          <Plus />
          New {type}
        </Button>
      </NewButtonDataTableHeader>
    </div>
  )
}
