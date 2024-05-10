'use client'

import { Table } from '@tanstack/react-table'
import { Plus, Search } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { TableTypes } from './container-data-table'
import { NewButtonDataTableHeader } from './polymorphism/new-button-data-table'

export function DataTableHeader({
  table,
  type,
}: {
  table: Table<unknown>
  type: TableTypes
}) {
  const [openSheet, updateOpenSheet] = React.useState(false)

  return (
    <div className="flex items-center px-8 gap-10 justify-between">
      <form className="flex max-w-sm items-center gap-3 rounded-xl bg-zinc-900 px-5 h-12">
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
      <NewButtonDataTableHeader
        open={openSheet}
        onOpenChange={updateOpenSheet}
        tableType={type}
      >
        <Button className="bg-color-primary text-white h-12 rounded-xl flex gap-2">
          <Plus />
          New {type}
        </Button>
      </NewButtonDataTableHeader>
    </div>
  )
}
