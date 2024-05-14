import { Category } from '@prisma/client'
import { Dumbbell, LucideProps, MonitorSmartphone, Shirt } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export function CategoryItem({ category }: { category: Category }) {
  const categoryIcons: {
    [key: string]: React.ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
    >
  } = {
    gym: Dumbbell,
    casual: Shirt,
    electronics: MonitorSmartphone,
  }

  const Icon = categoryIcons[category.slug] || null

  return (
    <Link
      className="border-2 border-color-secondary rounded-xl flex items-center justify-center gap-2 py-3"
      href={`/category/${category.slug}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span className="text-xs font-bold">{category.name}</span>
    </Link>
  )
}
