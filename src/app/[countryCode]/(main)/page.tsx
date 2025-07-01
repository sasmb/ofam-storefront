import { Metadata } from "next"

import CategorySection from "@modules/home/components/category-section"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import HeroBanner from "@modules/home/components/hero-banner"
import Testimonials from "@modules/home/components/testimonials"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "OFAM Mills - Premium Palm Oil Processing & Solutions",
  description:
    "Leading palm oil processing and milling services in Nigeria. Quality palm oil extraction, refining, and comprehensive palm oil solutions for farmers and businesses.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <CategorySection />
      <Testimonials />
      <HeroBanner />
      <div className="py-12 bg-gradient-to-br from-green-100 via-green-50 to-brand-light">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
