"use client"

import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-red-600 text-white py-2 px-4 relative overflow-hidden"
    >
      {/* Animated background stripes for visual interest */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-50"></div>
      
      <div className="relative z-10 content-container flex items-center justify-center">
        <motion.div
          className="text-center"
          animate={{ 
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.p 
            className="text-sm md:text-base font-bold tracking-wide uppercase"
            animate={{
              opacity: [1, 0.9, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🌾 HARVEST SEASON RATES SLASHED | BULK PROCESSING DISCOUNTS AVAILABLE* 🌾
          </motion.p>
        </motion.div>

        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
          aria-label="Close banner"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  )
}

export default TopBanner 