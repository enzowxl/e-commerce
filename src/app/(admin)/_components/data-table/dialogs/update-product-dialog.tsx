// import { Category } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import toast from 'react-hot-toast'

import { ProductTypes } from '@/app/api/(http)/product/route'
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
  // complementCategoryData,
}: {
  open: boolean
  slug: string
  onOpenChange: (open: boolean) => void
  // complementCategoryData?: Category[]
}) {
  const router = useRouter()

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const productData = {
      name: data.name,
      price: Number(data.price),
      type: data.type,
      description: data.description,
      categorySlug: data.category,
    }

    const filteredProductData = Object.fromEntries(
      Object.entries(productData).filter(([_, value]) => value),
    )

    await api('/product', {
      method: 'PATCH',
      body: JSON.stringify({
        slug,
        ...filteredProductData,
      }),
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
            <Label>Type</Label>
            <Select name="type">
              <SelectTrigger className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Types</SelectLabel>
                  {ProductTypes.map((type) => {
                    return (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
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
          {/* <div className="flex flex-col gap-3">
            <Label>Category</Label>
            <Select  name="category">
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
          </div> */}
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
