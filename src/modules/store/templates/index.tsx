import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="bg-gradient-to-br from-brand-light via-green-50 to-white min-h-screen">
      <div
        className="flex flex-col small:flex-row small:items-start py-12 content-container"
        data-testid="category-container"
      >
        <RefinementList sortBy={sort} />
        <div className="w-full">
          <div className="mb-12">
            <h1 
              className="text-4xl sm:text-5xl font-bold tracking-tight text-brand-primary mb-4"
              data-testid="store-page-title"
            >
              All Products
            </h1>
            <p className="text-xl text-brand-dark/70 leading-relaxed max-w-2xl">
              Discover our premium selection of agricultural products and solutions designed for modern farming excellence.
            </p>
          </div>
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
