'use client'

import Hero from '@/components/Hero'
import Timeline from '@/components/Timeline'
import DayEntry from '@/components/DayEntry'
import travelData from '@/data/travelLog.json'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Define color stops for each day
  const colorStops = [
    '#fef3c7', // Day 1 - Amber/Yellow
    '#dbeafe', // Day 2 - Blue
    '#f3e8ff', // Day 3 - Purple
    '#d1fae5', // Day 4 - Emerald
    '#fee2e2', // Day 5 - Red/Rose
  ]

  // Create smooth color transitions
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [colorStops[0], colorStops[0], colorStops[1], colorStops[2], colorStops[3], colorStops[4]]
  )

  return (
    <main className="relative">
      <Hero meta={travelData.meta} />
      
      <motion.div 
        ref={containerRef}
        style={{ backgroundColor }}
        className="relative transition-colors duration-1000"
      >
        <Timeline days={travelData.days} />
        {travelData.days.map((day, index) => (
          <DayEntry key={day.id} day={day} index={index} />
        ))}
      </motion.div>
      
      {/* Footer */}
      <footer className="relative bg-slate-900 text-sand-100 py-24 px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1),transparent_50%)]" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="font-serif text-3xl md:text-4xl mb-6 text-balance">
            The journey ends, but the pankration continues.
          </p>
          <div className="w-24 h-px bg-sand-400 mx-auto mb-6" />
          <p className="text-sm text-sand-300 opacity-75 mb-8 tracking-wide">
            {travelData.meta.year} — A time-traveling tale
          </p>
          <Link 
            href="/works-cited"
            className="inline-block text-sm text-sand-300 hover:text-sand-100 transition-all uppercase tracking-widest border-b border-sand-300 hover:border-sand-100 pb-1 group"
          >
            <span className="inline-block group-hover:-translate-y-0.5 transition-transform">
              Works Cited
            </span>
          </Link>
        </div>
      </footer>
    </main>
  )
}
