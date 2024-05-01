import { z } from 'zod'

export const productSchema = z.object({
  __typename: z.literal('Product').default('Product'),
  id: z.string().readonly(),
})

export type Product = z.infer<typeof productSchema>
