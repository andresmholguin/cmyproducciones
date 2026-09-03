import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Efecto typewriter: escribe el texto letra por letra cuando entra en viewport
export function useTypewriter(text, { speed = 80, startDelay = 500 } = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!inView) return
    let i = 0
    let interval
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [inView, text, speed, startDelay])

  return { ref, displayed, done }
}

// Contador animado cuando entra en viewport
export function useCounter(target, duration = 2000) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      // easing easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setValue(Math.floor(eased * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target, duration])

  return { ref, value }
}
