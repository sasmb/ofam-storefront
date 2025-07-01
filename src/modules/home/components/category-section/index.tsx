"use client"

import { motion } from 'framer-motion'
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const categories = [
  {
    id: 1,
    title: "RICE PROCESSING",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&crop=center",
    href: "/categories/rice-processing",
    description: "Premium milling services"
  },
  {
    id: 2,
    title: "GRAIN STORAGE",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop&crop=center",
    href: "/categories/grain-storage",
    description: "Secure storage solutions"
  },
  {
    id: 3,
    title: "BULK PROCESSING",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=400&fit=crop&crop=center",
    href: "/categories/bulk-processing",
    description: "Large scale operations"
  },
  {
    id: 4,
    title: "AGRICULTURAL TOOLS",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop&crop=center",
    href: "/categories/agricultural-tools",
    description: "Modern farming equipment"
  }
]

const CategorySection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-brand-light via-green-50 to-white">
      <div className="content-container">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-brand-dark tracking-tight"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Shop By Category
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <LocalizedClientLink 
              href="/store"
              className="text-brand-secondary hover:text-brand-primary transition-colors font-semibold text-lg"
            >
              View All
            </LocalizedClientLink>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <LocalizedClientLink href={category.href}>
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-secondary via-orange-400 to-yellow-400 p-1 shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Animated Background Blobs */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <motion.div
                      className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-300/30 rounded-full blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-10 -left-10 w-24 h-24 bg-orange-300/40 rounded-full blur-xl"
                      animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.2, 0.4],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                  </div>

                  {/* Content Container */}
                  <div className="relative bg-white rounded-xl overflow-hidden group-hover:bg-gray-50 transition-colors duration-300">
                    {/* Image Container */}
                    <div className="relative h-48 md:h-64 overflow-hidden">
                      <motion.img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        whileHover={{ scale: 1.05 }}
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Floating Elements */}
                      <motion.div
                        className="absolute top-4 right-4 w-4 h-4 bg-brand-secondary rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      />
                    </div>

                    {/* Text Content */}
                    <div className="p-6 text-center">
                      <motion.h3 
                        className="text-lg md:text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {category.title}
                      </motion.h3>
                      <p className="text-brand-dark/60 text-sm group-hover:text-brand-dark/80 transition-colors duration-300">
                        {category.description}
                      </p>
                      
                      {/* Arrow Icon */}
                      <motion.div
                        className="mt-4 inline-flex items-center text-brand-secondary group-hover:text-brand-primary transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-sm font-medium mr-1">Shop Now</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </LocalizedClientLink>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-brand-dark/70 mb-6 text-lg">
            Need custom agricultural solutions? We're here to help.
          </p>
          <LocalizedClientLink href="/contact">
            <motion.button
              className="bg-brand-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Custom Quote
            </motion.button>
          </LocalizedClientLink>
        </motion.div>
      </div>
    </section>
  )
}

export default CategorySection 