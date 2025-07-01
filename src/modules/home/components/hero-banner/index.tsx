"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const HeroBanner = () => {
  return (
    <div className="bg-brand-light py-8">
      <div className="content-container">
        <div className="relative group">
          <LocalizedClientLink href="/store" className="block relative overflow-hidden rounded-xl">
            {/* Desktop Image */}
            <img
              className="w-full h-full min-h-[400px] object-cover rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl md:block hidden"
              src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1920&h=800&fit=crop&crop=center"
              alt="OFAM Mills - Premium Palm Oil Processing & Extraction Solutions"
              height="800"
              width="1920"
            />
            
            {/* Mobile Image */}
            <img
              className="w-full h-full min-h-[300px] object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl md:hidden block"
              src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=645&h=741&fit=crop&crop=center"
              alt="OFAM Mills - Premium Palm Oil Processing & Extraction Solutions"
              height="741"
              width="645"
            />
            
            {/* Brand Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-secondary/5 rounded-xl pointer-events-none"></div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center text-center z-10">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-sm md:max-w-lg mx-4 border border-brand-primary/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <h2 className="text-2xl md:text-4xl font-bold text-brand-primary mb-3 md:mb-4">
                  Premium Palm Oil Processing
                </h2>
                <p className="text-base md:text-lg text-brand-dark/80 mb-4 md:mb-6">
                  State-of-the-art extraction and refining facilities delivering premium quality palm oil products
                </p>
                <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-brand-secondary text-white rounded-full font-semibold hover:bg-orange-400 transition-colors cursor-pointer">
                  <span>Explore Our Products</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner 