import { ReactNode } from 'react'

export function BasePage({
  children,
  title,
}: {
  children: ReactNode
  title: string
}) {
  return (
    <div className="flex flex-col flex-1 gap-12 rounded-xl p-5">
      {title && <h1 className="text-3xl font-bold text-white">{title}</h1>}
      <div>{children}</div>
    </div>
  )
}
