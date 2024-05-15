import { getProduct } from '@/app/(shop)/_actions/get-product'
import { BasePage } from '@/components/base-page'

export default async function Product({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const productBySlug = await getProduct(slug)
  return <BasePage title={`${productBySlug?.name}`}></BasePage>
}
