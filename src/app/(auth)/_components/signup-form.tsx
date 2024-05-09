'use client'

import { Label } from '@radix-ui/react-dropdown-menu'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/utils/api'

export function SignUpForm() {
  const router = useRouter()

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const name = data.name
    const email = data.email
    const password = data.password

    if (!email && !password && !name) {
      return null
    }

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

        toast.success('Successful sign up', {
          duration: 3000,
        })
        return router.push('/signin')
      })
      .catch((err) => {
        return console.log(err)
      })
  }

  return (
    <form onSubmit={handleSignUp} className="w-full flex flex-col gap-8">
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
        className="text-white font-medium text-lg w-full bg-color-primary h-12 rounded-xl"
      >
        Go
      </Button>
    </form>
  )
}
