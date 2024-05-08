'use client'

import { useRouter } from 'next/navigation'
import { signIn, SignInResponse } from 'next-auth/react'
import { FormEvent } from 'react'

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
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
      }).then((res: SignInResponse | undefined) => {
        if (res?.error) return

        return router.push('/')
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSignIn} className="w-full flex flex-col gap-8">
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
