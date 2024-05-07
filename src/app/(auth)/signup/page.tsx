import { SignUpForm } from '@/app/(auth)/_components/signup-form'

export default function SignUp() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-14">
      <h1 className="text-5xl font-bold">Sign Up</h1>
      <SignUpForm />
    </div>
  )
}
