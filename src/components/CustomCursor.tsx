import { useEffect, useRef } from 'react'

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'

export function CustomCursor() {
  const crosshairRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const crosshair = crosshairRef.current
    if (!crosshair) return

    const onMove = (e: MouseEvent) => {
      crosshair.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      document.body.classList.add('has-cursor')
    }
    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(HOVER_SELECTOR)
      crosshair.classList.toggle('is-hover', !!target)
    }
    const onDown = () => crosshair.classList.add('is-down')
    const onUp = () => crosshair.classList.remove('is-down')
    const onLeave = () => document.body.classList.remove('has-cursor')

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={crosshairRef} className="custom-cursor-crosshair">
        <span className="custom-cursor-tick custom-cursor-tick-left" />
        <span className="custom-cursor-tick custom-cursor-tick-right" />
        <span className="custom-cursor-tick custom-cursor-tick-top" />
        <span className="custom-cursor-tick custom-cursor-tick-bottom" />
        <span className="custom-cursor-dot" />
      </div>
    </div>
  )
}
