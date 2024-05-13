import { CircleX } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, ReactNode } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { api } from '@/utils/api'
export function NewUserSheet({
  children,
  open,
  onOpenChange,
}: {
  children: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const name = data.name
    const email = data.email
    const password = data.password

    await api('/auth/users', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const { error } = await res.json()
          return toast.error(error, {
            duration: 3000,
          })
        }

        toast.success('User created successfully', {
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
            Create user
          </Label>
          <form onSubmit={handleCreate} className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Label>Full name</Label>
              <Input
                name="name"
                className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
                placeholder="John Doe"
                type="text"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Email</Label>
              <Input
                name="email"
                className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
                placeholder="johndoe@example.com"
                type="email"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Password</Label>
              <Input
                name="password"
                className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
                placeholder="*************"
                type="password"
                required
              />
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
