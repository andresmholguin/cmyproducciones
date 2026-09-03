import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap.js'

// Orbe ambiental que se desplaza con el scroll (scrub).
// Capa decorativa nueva: ningún otro sistema la anima, cero conflictos.
function ScrollOrb({ className = '', fromY = 80, toY = -80 }) {
  const ref = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        ref.current,
        { y: fromY },
        {
          y: toY,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )
    })
    return () => mm.revert()
  }, { scope: ref })

  return (
    <div
      ref={ref}
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}

export default ScrollOrb
