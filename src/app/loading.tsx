import { LoadingSvg } from '@/components/svg/loading-svg'

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center gap-10 text-center">
      <LoadingSvg />
      <h1 className="font-bold text-4xl">Loading...</h1>
    </div>
  )
}
