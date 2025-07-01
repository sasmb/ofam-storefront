"use client"

import { motion } from 'framer-motion'
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const PromoBanner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-brand-secondary via-red-500 to-brand-secondary py-8">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundSize: '200% 200%'
          }}
        />
        
        {/* Moving Shapes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 bg-white/10 rounded-full"
            style={{
              left: `${(i * 12) + 5}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2 + (i * 0.2),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Static Text Background - Duplicated to Fill Space */}
      <div className="absolute top-2 left-0 w-full text-white/50 font-bold text-lg overflow-hidden">
        <div
          className="tracking-wider whitespace-nowrap text-center"
          style={{
            textShadow: '0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.4)'
          }}
        >
          🌴 PALM OIL PROCESSING SPECIAL • BULK EXTRACTION • PREMIUM QUALITY • 🌴 PALM OIL PROCESSING SPECIAL • BULK EXTRACTION • PREMIUM QUALITY • 🌴 PALM OIL PROCESSING SPECIAL • BULK EXTRACTION • PREMIUM QUALITY • 🌴 PALM OIL PROCESSING SPECIAL • BULK EXTRACTION • PREMIUM QUALITY 🌴
        </div>
      </div>

      <div className="absolute bottom-2 left-0 w-full text-white/50 font-bold text-lg overflow-hidden">
        <div
          className="tracking-wider whitespace-nowrap text-center"
          style={{
            textShadow: '0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.4)'
          }}
        >
          LIMITED TIME OFFER • PALM OIL EXTRACTION • PRODUCERS CHOICE • LIMITED TIME OFFER • PALM OIL EXTRACTION • PRODUCERS CHOICE • LIMITED TIME OFFER • PALM OIL EXTRACTION • PRODUCERS CHOICE • LIMITED TIME OFFER • PALM OIL EXTRACTION • PRODUCERS CHOICE
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 content-container text-center text-white">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Offer Text */}
          <motion.div
            className="mb-6"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="text-sm font-semibold mb-2 tracking-wider">
              <motion.span
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🌴 PALM OIL PROCESSING SPECIAL 🌴
              </motion.span>
            </div>
            
            <motion.h1 
              className="text-4xl md:text-7xl font-black mb-4 leading-tight"
              animate={{
                textShadow: [
                  '2px 2px 4px rgba(0,0,0,0.3)',
                  '4px 4px 8px rgba(0,0,0,0.5)',
                  '2px 2px 4px rgba(0,0,0,0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              UP TO{' '}
              <motion.span
                className="inline-block text-yellow-300"
                animate={{ 
                  rotate: [-2, 2, -2],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                30%
              </motion.span>{' '}
              OFF
            </motion.h1>
            
            <motion.div 
              className="text-2xl md:text-4xl font-bold mb-6"
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              PALM OIL EXTRACTION
              <motion.span
                className="text-yellow-300 text-lg md:text-2xl ml-2"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                *
              </motion.span>
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LocalizedClientLink href="/store">
              <motion.button
                className="bg-white text-red-600 px-8 py-4 rounded-full font-black text-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                animate={{
                  boxShadow: [
                    '0 4px 20px rgba(255,255,255,0.3)',
                    '0 8px 30px rgba(255,255,255,0.5)',
                    '0 4px 20px rgba(255,255,255,0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span
                  className="relative z-10"
                  animate={{ 
                    textShadow: ['none', '1px 1px 2px rgba(0,0,0,0.2)', 'none']
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  GET QUOTE NOW
                </motion.span>
                
                {/* Button pulse effect */}
                <motion.div
                  className="absolute inset-0 bg-yellow-300 rounded-full"
                  animate={{
                    scale: [0, 1],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              </motion.button>
            </LocalizedClientLink>
          </motion.div>

          {/* Accent Badge */}
          <motion.div
            className="absolute top-4 right-4 md:top-8 md:right-8"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="bg-yellow-400 text-red-600 px-4 py-2 rounded-full font-black text-sm md:text-base transform rotate-12 shadow-lg">
              <motion.span
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                RATES SLASHED AGAIN!
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default PromoBanner