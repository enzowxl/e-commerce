'use client'

import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

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

    try {
      await api('/auth/users', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
    } catch (err) {
      console.log(err)
    }

    return router.push('/signin')
  }

  return (
    <form onSubmit={handleSignUp} className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <label className="font-medium">Full name</label>
        <input
          name="name"
          className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-14 px-4 outline-none"
          placeholder="John Doe"
          type="text"
          required
        />
      </div>
      <div className="flex flex-col gap-3">
        <label className="font-medium">Email</label>
        <input
          name="email"
          className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-14 px-4 outline-none"
          placeholder="johndoe@example.com"
          type="email"
          required
        />
      </div>
      <div className="flex flex-col gap-3">
        <label className="font-medium">Password</label>
        <input
          name="password"
          className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-14 px-4 outline-none"
          placeholder="*************"
          type="password"
          required
        />
      </div>
      <button
        type="submit"
        className="font-medium text-lg w-full bg-color-primary h-14 rounded-xl"
      >
        Go
      </button>
    </form>
  )
}
