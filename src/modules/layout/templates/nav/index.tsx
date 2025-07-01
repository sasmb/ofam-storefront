import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import { ShoppingBag, User } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-20 mx-auto border-b duration-200 bg-brand-light/95 backdrop-blur-md border-brand-primary/20">
        <nav className="content-container txt-xsmall-plus text-brand-dark flex items-center justify-between w-full h-full text-small-regular px-6">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full flex items-center">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="flex items-center hover:opacity-80 transition-all duration-300 transform hover:scale-105"
              data-testid="nav-store-link"
            >
              <img
                src="/pictures/ofam-logo.png"
                alt="OFAM Agro Enterprise"
                className="h-14 w-auto object-contain filter drop-shadow-sm"
              />
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-4 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-4 h-full">
              <LocalizedClientLink
                className="group relative hover:text-brand-secondary transition-all duration-300 flex items-center gap-2 p-3 rounded-full hover:bg-white/50 border border-transparent hover:border-brand-primary/20"
                href="/account"
                data-testid="nav-account-link"
              >
                <div className="relative">
                  <User className="w-8 h-8 transition-transform duration-200 group-hover:scale-110 text-brand-primary" />
                  <div className="absolute inset-0 rounded-full bg-brand-secondary/20 scale-0 group-hover:scale-100 transition-transform duration-200"></div>
                </div>
                <span className="sr-only">Account</span>
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="group relative hover:text-brand-secondary transition-all duration-300 flex items-center gap-2 p-3 rounded-full hover:bg-white/50 border border-transparent hover:border-brand-primary/20"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <div className="relative">
                    <ShoppingBag className="w-8 h-8 transition-transform duration-200 group-hover:scale-110 text-brand-primary" />
                    <div className="absolute inset-0 rounded-full bg-brand-secondary/20 scale-0 group-hover:scale-100 transition-transform duration-200"></div>
                  </div>
                  <span className="sr-only">Cart (0)</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
