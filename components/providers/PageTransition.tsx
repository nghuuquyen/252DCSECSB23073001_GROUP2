'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transition = 'none'
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.2s ease'
        el.style.opacity = '1'
      })
    })
  }, [pathname])

  return (
    <div ref={ref} className="flex-1 flex flex-col">
      {children}
    </div>
  )
}