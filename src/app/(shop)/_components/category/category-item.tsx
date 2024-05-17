import { Category } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

export function CategoryItem({ category }: { category: Category }) {
  return (
    <Link
      className="border-2 border-color-secondary rounded-xl flex items-center justify-center gap-2 py-3"
      href={`/category/${category.slug}`}
    >
      <span className="text-xs font-bold">{category.name}</span>
    </Link>
  )
}
