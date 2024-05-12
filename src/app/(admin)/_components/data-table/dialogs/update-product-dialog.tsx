// import { Category } from '@prisma/client'
import { Category } from '@prisma/client'
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

export function UpdateProductDialog({
  open,
  slug,
  onOpenChange,
  complementCategoryData,
}: {
  open: boolean
  slug: string
  onOpenChange: (open: boolean) => void
  complementCategoryData?: Category[]
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

    await api('/product', {
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

        toast.success('Product updated successfully', {
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
          <DialogTitle>Edit product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdate} className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <Label>Name</Label>
            <Input
              name="name"
              className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
              placeholder="Black shirt"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Price</Label>
            <Input
              name="price"
              className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
              placeholder="12,00"
              type="number"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Discount percent</Label>
            <Input
              name="discount"
              className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
              placeholder="10"
              type="number"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Description</Label>
            <Input
              name="description"
              className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
              placeholder="This is a black shirt"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Category</Label>
            <Select
              disabled={complementCategoryData?.length === 0}
              name="categorySlug"
            >
              <SelectTrigger className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {complementCategoryData?.map((category) => {
                    return (
                      <SelectItem key={category.id} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
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
