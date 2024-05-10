import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import toast from 'react-hot-toast'

import { getHeaders } from '@/actions/get-headers'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import { api } from '@/utils/api'

export function UpdateUserDialog({
  open,
  email,
  onOpenChange,
}: {
  open: boolean
  email: string
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const role = data.role

    const headers = await getHeaders()

    await api('/auth/users', {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        email,
        role,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const { error } = await res.json()
          return toast.error(error, {
            duration: 3000,
          })
        }

        toast.success('User updated successfully', {
          duration: 3000,
        })
      })
      .catch((err) => {
        return console.log(err)
      })

    onOpenChange(!open)

    return router.refresh()
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] z-50">
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdate} className="w-full flex flex-col gap-8">
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
      </DialogContent>
    </Dialog>
  )
}
