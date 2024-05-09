'use client'

import { Label } from '@radix-ui/react-dropdown-menu'
import { useRouter } from 'next/navigation'
import { signIn, SignInResponse } from 'next-auth/react'
import { FormEvent } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function SignInForm() {
  const router = useRouter()

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const email = data.email
    const password = data.password

    if (!email && !password) {
      return null
    }

    await signIn('credentials', {
      email,
      password,
      redirect: false,
    }).then((res: SignInResponse | undefined) => {
      if (res?.error)
        return toast.error(res.error, {
          duration: 3000,
        })
      toast.success('Successful sign in', {
        duration: 3000,
      })
      return router.refresh()
    })
  }

  return (
    <form onSubmit={handleSignIn} className="w-full flex flex-col gap-8">
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
        className="text-white font-medium text-lg w-full bg-color-primary h-12 rounded-xl"
      >
        Go
      </Button>
    </form>
  )
}
