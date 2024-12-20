import clsx from 'clsx'
import { ReactNode } from 'react'

export function BasePage({
  children,
  title,
  className,
  classNameTitle,
}: {
  children: ReactNode
  title?: string
  className?: string
  classNameTitle?: string
}) {
  return (
    <div
      className={clsx(`flex flex-col flex-1 gap-10 rounded-xl p-8`, className)}
    >
      {title && (
        <h1 className={clsx('text-3xl font-bold text-white', classNameTitle)}>
          {title}
        </h1>
      )}
      <div>{children}</div>
    </div>
  )
}
