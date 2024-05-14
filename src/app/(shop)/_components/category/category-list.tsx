import { Category } from '@prisma/client'

import { CategoryItem } from './category-item'

export function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <div className="grid gap-5 grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
      {categories?.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}
