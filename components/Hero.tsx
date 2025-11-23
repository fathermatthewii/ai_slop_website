'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useRef } from 'react'

interface HeroProps {
  meta: {
    title: string
    subtitle: string
    author: string
    dateRange: string
    year: string
    theme: string
  }
}

export default function Hero({ meta }: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  
  // Transition from white/sand to Day 1 amber/yellow - more gradual
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ['rgb(254, 249, 240)', 'rgb(254, 246, 220)', 'rgb(254, 245, 210)', 'rgb(254, 243, 199)'] // sand-50 → amber-100
  )

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-8 py-24 overflow-hidden"
    >
      <motion.div
        style={{ backgroundColor }}
        className="absolute inset-0 -z-10"
      />
      <motion.div 
        style={{ opacity, scale, y }}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6"
        >
          <span className="text-sm uppercase tracking-widest text-sage-600 font-sans">
            {meta.dateRange} • {meta.year}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-slate-900 mb-6 leading-tight text-balance"
        >
          {meta.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="text-xl md:text-2xl text-sage-700 font-light mb-4 text-balance max-w-3xl mx-auto"
        >
          {meta.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-sm md:text-base text-slate-600 italic max-w-2xl mx-auto mb-16"
        >
          {meta.theme}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
          className="h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent w-full max-w-md mx-auto mb-16"
        />

        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
          }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const dayOne = document.getElementById('day-1')
            if (dayOne) {
              dayOne.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }}
          className="group flex flex-col items-center gap-2 cursor-pointer relative px-8 py-4 rounded-full hover:bg-sage-100/50 transition-all duration-300 mx-auto"
        >
          <span className="text-xs uppercase tracking-widest text-slate-500 group-hover:text-sage-700 transition-colors">
            Begin Journey
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            <ChevronDown className="w-5 h-5 text-sage-600 group-hover:text-amber-600 transition-colors" />
          </motion.div>
          
          {/* Hover glow effect */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-amber-200/20 via-yellow-200/20 to-amber-200/20 rounded-full blur-xl -z-10"
          />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        className="absolute top-20 right-10 w-96 h-96 bg-sage-200 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-20 left-10 w-80 h-80 bg-sand-300 rounded-full blur-3xl pointer-events-none"
      />

      <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-multiply">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]" />
      </div>
    </section>
  )
}
