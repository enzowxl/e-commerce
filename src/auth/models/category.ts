import { z } from 'zod'

export const categorySchema = z.object({
  __typename: z.literal('Category').default('Category'),
  id: z.string().readonly(),
})

export type Category = z.infer<typeof categorySchema>
