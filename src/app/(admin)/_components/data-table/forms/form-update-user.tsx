'use client'

import { FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function FormUpdateUser() {
  function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const name = data.name
    const role = data.role

    if (!name && !role) {
      return null
    }
  }

  return (
    <form onSubmit={handleUpdate} className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Label>Name</Label>
        <Input
          name="Name"
          className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
          placeholder="John Doe"
          type="text"
          required
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label>Role</Label>
        <Select name="role">
          <SelectTrigger className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Roles</SelectLabel>
              <SelectItem value="ADMIN">ADMIN</SelectItem>
              <SelectItem value="MEMBER">MEMBER</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button
        type="submit"
        className="text-white w-full bg-color-primary h-12 rounded-xl"
      >
        Update
      </Button>
    </form>
  )
}
