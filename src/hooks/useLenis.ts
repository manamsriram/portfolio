import { useEffect } from 'react'
import Lenis from 'lenis'

declare global {
  interface Window {
    lenis?: Lenis
  }
}

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    window.lenis = lenis

    let raf = 0
    const tick = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      window.lenis = undefined
    }
  }, [])
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.lenis) window.lenis.scrollTo(el)
  else el.scrollIntoView({ behavior: 'smooth' })
}
