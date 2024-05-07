import { SignInForm } from '@/app/(auth)/_components/signin-form'

export default function SignIn() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-14">
      <h1 className="text-5xl font-bold">Sign In</h1>
      <SignInForm />
    </div>
  )
}
