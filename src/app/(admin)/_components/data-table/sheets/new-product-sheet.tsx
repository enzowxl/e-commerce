import { Category } from '@prisma/client'
import { CircleX } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, ReactNode } from 'react'
import toast from 'react-hot-toast'

import { ProductTypes } from '@/app/api/(http)/product/route'
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { api } from '@/utils/api'
export function NewProductSheet({
  children,
  open,
  onOpenChange,
  complementCategoryData,
}: {
  children: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  complementCategoryData?: Category[]
}) {
  const router = useRouter()

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    await api('/product', {
      method: 'POST',
      body: formData,
    })
      .then(async (res) => {
        if (!res.ok) {
          const { error } = await res.json()
          return toast.error(error, {
            duration: 3000,
          })
        }

        toast.success('Product created successfully', {
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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="outline-none flex flex-col gap-10" side={'left'}>
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold text-white">
            shop.dev
          </Link>
          <SheetClose className="outline-none">
            <CircleX className="min-w-5 min-h-5 cursor-pointer" />
          </SheetClose>
        </div>
        <div className="flex flex-col gap-4">
          <Label className="text-lg font-semibold leading-none tracking-tight pb-5">
            Create product
          </Label>
          <form onSubmit={handleCreate} className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                name="name"
                className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
                placeholder="Black shirt"
                type="text"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Price</Label>
              <Input
                name="price"
                className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
                placeholder="12,00"
                type="number"
                required
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
            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <Select name="categorySlug">
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
              Create
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
