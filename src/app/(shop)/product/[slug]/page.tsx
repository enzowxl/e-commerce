import Image from 'next/image'

import { getProduct } from '@/app/(shop)/_actions/get-product'
import { BasePage } from '@/components/base-page'

import { getProducts } from '../../_actions/get-products'
import { ProductInfo } from '../../_components/product/product-info'
import { ProductList } from '../../_components/product/product-list'

export default async function Product({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const product = await getProduct(slug)
  const productsByCategorySlug = await getProducts({
    type: 'CATEGORY',
    categorySlug: product?.categorySlug as string,
  })
  const productsInOffer = await getProducts({
    type: 'OFFER',
  })
  return (
    <BasePage>
      <div className="flex flex-col gap-10">
        <div className="w-full flex max-lg:flex-col gap-5">
          <div className="w-full bg-color-secondary rounded-xl max-lg:p-8">
            <Image
              src={product.photoUrl ?? ''}
              alt={product.name}
              width={0}
              height={0}
              sizes="100vh"
              className="rounded-lg object-contain h-auto max-h-96 w-full"
            />
          </div>
          <div className="w-full bg-color-secondary rounded-xl p-8">
            <ProductInfo product={product} />
          </div>
        </div>
        <div>
          {productsByCategorySlug.filter(
            (productList) => productList.slug !== product.slug,
          ).length > 0 ? (
            <ProductList
              title="Recommended products"
              products={productsByCategorySlug}
              filter={(productList) => productList.slug !== product.slug}
            />
          ) : (
            <ProductList
              title="Recommended products"
              products={productsInOffer}
              filter={(productList) => productList.slug !== product.slug}
            />
          )}
        </div>
      </div>
    </BasePage>
  )
}
