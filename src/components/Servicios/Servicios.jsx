import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../../lib/gsap.js'
import SectionHeading from '../SectionHeading/SectionHeading.jsx'
import Beam from '../Beam/Beam.jsx'

const SERVICIOS = [
  {
    num: '01',
    img: '/images/gallery/event3.jpg',
    imgAlt: 'Show en vivo con iluminación escénica CMY',
    title: 'Luces',
    tagline: 'Atmósfera y espectáculo',
    text: 'Iluminación escénica profesional que transforma cualquier espacio. Moving heads, barras LED y seguidores manejados por operadores expertos.',
    items: ['Moving heads', 'Barras LED', 'Seguidores', 'Luz ambiental'],
    accent: 'cyan',
  },
  {
    num: '02',
    img: '/images/gallery/event5.jpg',
    imgAlt: 'Evento social con sonido profesional CMY',
    title: 'Sonido',
    tagline: 'Potencia y claridad',
    text: 'Cobertura total con alta fidelidad: sistemas line array, subwoofers que se sienten en el pecho y microfonía sin fallas.',
    items: ['Line array', 'Subwoofers', 'Mezcladoras', 'Micrófonos'],
    accent: 'magenta',
  },
  {
    num: '03',
    img: '/images/gallery/event6.jpg',
    imgAlt: 'Pantalla LED gigante en evento deportivo',
    title: 'Pantallas LED',
    tagline: 'Imagen a escala gigante',
    text: 'Pantallas de alta resolución en varios tamaños para video, contenido visual y branding que se ve desde cualquier punto.',
    items: ['Alta resolución', 'Varios tamaños', 'Video en vivo', 'Branding'],
    accent: 'yellow',
  },
  {
    num: '04',
    img: '/images/gallery/event4.jpg',
    imgAlt: 'Festival con efectos especiales de luces',
    title: 'Efectos Especiales',
    tagline: 'El factor sorpresa',
    text: 'Humo, láser, confeti y CO2 que convierten los momentos clave en recuerdos imborrables para tu público.',
    items: ['Láser', 'Humo', 'Confeti', 'Efectos CO2'],
    accent: 'magenta',
  },
]

const ACCENT_TEXT = {
  cyan: 'text-gel-cyan',
  magenta: 'text-gel-magenta',
  yellow: 'text-gel-yellow',
}

function Servicios() {
  const [selected, setSelected] = useState(0)
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const panelRef = useRef(null)
  const active = SERVICIOS[selected]

  const select = (i) => {
    if (i === selected) return
    const el = panelRef.current
    if (!el || reduceMotion) {
      setSelected(i)
      return
    }
    gsap.to(el, {
      autoAlpha: 0,
      y: 10,
      duration: 0.16,
      ease: 'power2.out',
      overwrite: 'auto',
      onComplete: () => {
        setSelected(i)
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 14, filter: 'blur(4px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
            clearProps: 'filter',
          }
        )
      },
    })
  }

  return (
    <section id="servicios" className="relative py-[100px]">
      <Beam from="cyan" to="magenta" />
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <div className="relative rounded-[28px] border border-white/10 bg-black/30 backdrop-blur-xl px-6 py-10 md:px-10 md:py-12 shadow-[0_0_80px_rgba(0,188,212,0.10),0_0_160px_rgba(233,30,99,0.08)]">
          <SectionHeading
            eyebrow="Lo que alquilamos"
            lead="Nuestros"
            accentWord="Servicios"
            accentColor="cyan"
            subtitle="Elige un servicio para ver el detalle"
          />

          <div className="grid gap-8 lg:grid-cols-12">
            {/* Lista selectora */}
            <div className="flex flex-col gap-3 lg:col-span-5" role="group" aria-label="Servicios">
              {SERVICIOS.map((s, i) => {
                const isActive = i === selected
                return (
                  <motion.button
                    key={s.title}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => select(i)}
                    className={`flex items-center gap-5 rounded-2xl px-5 py-5 text-left transition-[background-color,box-shadow] duration-150 ease-out active:scale-[0.96] cursor-pointer ${
                      isActive
                        ? 'bg-white/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.13)]'
                        : 'hover:bg-white/[0.03]'
                    }`}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
                  >
                    <span className={`text-[0.95rem] font-bold tabular-nums ${isActive ? ACCENT_TEXT[s.accent] : 'text-zinc-600'}`}>
                      {s.num}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className={`block text-[1.25rem] font-bold leading-tight ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                        {s.title}
                      </span>
                      <span className="block text-zinc-500 text-[0.85rem] mt-0.5">{s.tagline}</span>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`shrink-0 transition-[transform,opacity,color] duration-150 ${isActive ? `${ACCENT_TEXT[s.accent]} translate-x-0 opacity-100` : '-translate-x-1 opacity-0 text-zinc-600'}`}
                      aria-hidden="true"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </motion.button>
                )
              })}
            </div>

            {/* Panel detalle */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="lg:sticky lg:top-28 rounded-[24px] bg-white/[0.04] p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
                <div ref={panelRef}>
                  <div className="relative overflow-hidden rounded-2xl mb-6">
                    <motion.img
                      key={active.img}
                      src={active.img}
                      alt={active.imgAlt}
                      loading="lazy"
                      className="w-full h-56 md:h-64 object-cover"
                      initial={{ scale: 1.08 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                    <span className="img-outline absolute inset-0 rounded-2xl pointer-events-none" aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
                    <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/45 backdrop-blur-md px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-zinc-200 pointer-events-none">
                      {active.title}
                    </span>
                  </div>
                  <h3 className="text-[1.6rem] font-bold mb-2">{active.title}</h3>
                  <p className="text-zinc-400 text-[1rem] mb-5">{active.text}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {active.items.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-[0.8rem] text-zinc-300">
                        {item}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contacto"
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className={`inline-flex items-center gap-2 font-semibold cursor-pointer ${ACCENT_TEXT[active.accent]}`}
                  >
                    Cotizar {active.title}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Servicios
