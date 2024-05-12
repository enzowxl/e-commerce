import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/utils/api'

export function UpdateCategoryDialog({
  open,
  slug,
  onOpenChange,
}: {
  open: boolean
  slug: string
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    formData.append('slug', slug)

    Array.from(formData.keys()).forEach((key) => {
      const value = formData.get(key)

      if (typeof value === 'string' && value === '') {
        formData.delete(key)
      }

      if (value instanceof File && value.size <= 0) {
        formData.delete(key)
      }
    })

    await api('/category', {
      method: 'PATCH',
      body: formData,
    })
      .then(async (res) => {
        if (!res.ok) {
          const { error } = await res.json()
          return toast.error(error, {
            duration: 3000,
          })
        }

        toast.success('Category updated successfully', {
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdate} className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <Label>Name</Label>
            <Input
              name="name"
              className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
              placeholder="Gym"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Photo</Label>
            <div className="flex items-center w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 outline-none">
              <Input
                name="photo"
                className="flex-1 h-full z-50 opacity-0"
                placeholder="This is a black shirt"
                type="file"
                accept="image/*"
              />
              <Label className="px-4 absolute">Select photo</Label>
            </div>
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
