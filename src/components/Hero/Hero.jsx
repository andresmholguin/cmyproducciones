import { useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap, useGSAP } from '../../lib/gsap.js'
import { useTypewriter } from '../../hooks/useAnimations.js'
import GelButton from '../GelButton/GelButton.jsx'

function Hero() {
  const sectionRef = useRef(null)
  const typewriter = useTypewriter('nuestra producción', { speed: 90, startDelay: 800 })

  const scrollTo = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Timeline de entrada: letras -> subtítulo -> indicador scroll
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.hero-char', { yPercent: 0, rotation: 0, autoAlpha: 1 })
      gsap.set(['.hero-sub', '.hero-scroll'], { autoAlpha: 1, y: 0 })
    })
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.addLabel('chars', 0)
        .fromTo(
          '.hero-char',
          { yPercent: 115, rotation: 5, autoAlpha: 0 },
          { yPercent: 0, rotation: 0, autoAlpha: 1, duration: 1.1, stagger: 0.028 },
          'chars'
        )
        .from('.hero-sub', { y: 30, autoAlpha: 0, duration: 0.9 }, 'chars+=0.55')
        .from('.hero-scroll', { autoAlpha: 0, duration: 0.6, ease: 'power2.out' }, 'chars+=1.0')
    })
    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex justify-center min-h-screen min-h-[100svh]"
    >
      <div className="hero-content relative z-[1] text-center px-5 pt-[120px] pb-20 w-[90%] max-w-[1200px] m-auto">
        <div className="hero-glass rounded-[28px] border border-white/10 bg-black/30 backdrop-blur-2xl px-6 py-10 md:px-12 md:py-12 shadow-[0_0_80px_rgba(0,188,212,0.10),0_0_160px_rgba(233,30,99,0.08)]">
        <div className="hero-text">
        <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-bold text-white leading-[1.12] tracking-[-0.025em] mb-6 min-h-[2.3em]">
          <span className="block" aria-label="Tu evento,">
            {'Tu evento,'.split('').map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
                <span className="hero-char inline-block will-change-transform opacity-0">
                  {ch === ' ' ? ' ' : ch}
                </span>
              </span>
            ))}
          </span>
          <span className="text-gel-gradient" ref={typewriter.ref}>
            {typewriter.displayed}
            {!typewriter.done ? <span className="caret">|</span> : null}
          </span>
        </h1>

        <p className="hero-sub text-[clamp(1.1rem,2.5vw,1.4rem)] text-zinc-300 max-w-[600px] mx-auto mb-10">
          Alquiler profesional de luces, sonido y pantallas LED para eventos que dejan huella.
        </p>

        <GelButton
          href="#contacto"
          size="lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          onClick={(e) => scrollTo(e, '#contacto')}
        >
          Solicitar Presupuesto
        </GelButton>
        </div>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 z-[1]">
        <a
          href="#servicios"
          className="flex flex-col items-center gap-2 text-zinc-400 text-[0.85rem] [text-shadow:0_1px_12px_rgba(0,0,0,0.9)]"
          onClick={(e) => scrollTo(e, '#servicios')}
        >
          <span>Descubre más</span>
          <motion.span
            className="w-5 h-5 border-r-2 border-b-2 border-gel-cyan"
            style={{ rotate: 45 }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </a>
      </div>
    </section>
  )
}

export default Hero
