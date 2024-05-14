import { Category } from '@prisma/client'

import { CategoryItem } from './category-item'

export function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:grid-cols-6">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}
