"use client"

import { Button } from "@medusajs/ui"
import { SparklesText } from "@modules/common/components/sparkles-text"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full relative bg-gradient-to-br from-brand-light to-green-50">
      {/* Palm Tree Leaf Border - Seamless Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
        {/* Gradient Background Transition - Seamless to testimonials */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-50/80 to-green-100"></div>
        
        <svg
          viewBox="0 0 1200 100"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Define gradient for palm leaves */}
          <defs>
            <linearGradient id="palmGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#677D3F" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#84b95e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#dcfce7" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="palmGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8ba660" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#a3d977" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f0fdf4" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="palmGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F38D27" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#bbf7d0" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#dcfce7" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          
          {/* Main palm leaf fronds - darkest layer */}
          <path
            d="M0,100 C50,70 100,20 150,50 C200,80 250,20 300,50 C350,80 400,20 450,50 C500,80 550,20 600,50 C650,80 700,20 750,50 C800,80 850,20 900,50 C950,80 1000,20 1050,50 C1100,80 1150,20 1200,50 L1200,100 Z"
            fill="url(#palmGradient1)"
            className="drop-shadow-lg"
          />
          
          {/* Secondary palm frond layer */}
          <path
            d="M0,100 C75,60 125,10 175,40 C225,70 275,10 325,40 C375,70 425,10 475,40 C525,70 575,10 625,40 C675,70 725,10 775,40 C825,70 875,10 925,40 C975,70 1025,10 1075,40 C1125,70 1175,10 1200,40 L1200,100 Z"
            fill="url(#palmGradient2)"
          />
          
          {/* Detailed palm leaf patterns */}
          <path
            d="M0,100 C25,85 75,60 125,75 C175,90 225,60 275,75 C325,90 375,60 425,75 C475,90 525,60 575,75 C625,90 675,60 725,75 C775,90 825,60 875,75 C925,90 975,60 1025,75 C1075,90 1125,60 1200,75 L1200,100 Z"
            fill="url(#palmGradient3)"
          />
          
          {/* Fine palm leaf details */}
          <path
            d="M0,100 C40,90 80,70 120,85 C160,95 200,70 240,85 C280,95 320,70 360,85 C400,95 440,70 480,85 C520,95 560,70 600,85 C640,95 680,70 720,85 C760,95 800,70 840,85 C880,95 920,70 960,85 C1000,95 1040,70 1080,85 C1120,95 1160,70 1200,85 L1200,100 Z"
            fill="url(#palmGradient1)"
            className="opacity-60"
          />
        </svg>
        
        {/* Floating palm elements with transitional colors */}
        <div className="absolute bottom-8 left-12 w-3 h-3 bg-brand-secondary rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-12 right-24 w-2 h-2 bg-green-400 rounded-full opacity-50 animate-pulse delay-1000"></div>
        <div className="absolute bottom-6 left-1/4 w-4 h-4 bg-brand-primary rounded-full opacity-30 animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 right-1/3 w-3 h-3 bg-green-600 rounded-full opacity-35 animate-pulse delay-500"></div>
        <div className="absolute bottom-4 left-2/3 w-2 h-2 bg-brand-secondary rounded-full opacity-45 animate-pulse delay-1500"></div>
        
        {/* Additional texture elements */}
        <div className="absolute bottom-14 left-1/6 w-1 h-8 bg-gradient-to-b from-brand-primary to-transparent opacity-40 transform rotate-12"></div>
        <div className="absolute bottom-16 right-1/5 w-1 h-6 bg-gradient-to-b from-green-500 to-transparent opacity-30 transform -rotate-12"></div>
        <div className="absolute bottom-12 left-3/4 w-1 h-10 bg-gradient-to-b from-brand-secondary to-transparent opacity-35 transform rotate-6"></div>
      </div>
      
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <div className="mb-4">
            <SparklesText 
              text="OFAM Mills"
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-brand-primary"
              sparklesCount={20}
              colors={{
                first: "#677D3F",  // Brand primary green
                second: "#F38D27"  // Brand secondary orange
              }}
            />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl leading-relaxed text-brand-dark font-normal">
            Premium Palm Oil Products & Processing Solutions
          </h2>
        </span>
        <a
          href="/store"
        >
          <Button className="bg-brand-secondary hover:bg-orange-400 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 border-0">
            Shop Now
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Hero
