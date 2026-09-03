import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap, useGSAP } from '../../lib/gsap.js'
import { useCounter } from '../../hooks/useAnimations.js'
import SectionHeading from '../SectionHeading/SectionHeading.jsx'
import Beam from '../Beam/Beam.jsx'

const STATS = [
  { target: 150, suffix: '+', label: 'Eventos realizados', bar: 'bg-gel-cyan' },
  { target: 10, suffix: '+', label: 'Años de experiencia', bar: 'bg-gel-magenta' },
  { target: 98, suffix: '%', label: 'Clientes satisfechos', bar: 'bg-gel-yellow' },
]

const MARQUEE = ['Conciertos', 'Corporativos', 'Teatro', 'Sociales', 'Deportivos', 'Festivales']

function StatRow({ stat, index }) {
  const counter = useCounter(stat.target)

  return (
    <motion.div
      ref={counter.ref}
      className="flex items-center gap-5 border-t border-white/10 py-5 last:border-b"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <span className={`h-12 w-1 rounded-full ${stat.bar}`} aria-hidden="true" />
      <span className="text-[2.75rem] leading-none font-bold text-white tabular-nums">
        {counter.value}
        {stat.suffix}
      </span>
      <span className="text-zinc-400 text-[0.95rem]">{stat.label}</span>
    </motion.div>
  )
}

function Nosotros() {
  const sectionRef = useRef(null)
  const photoRef = useRef(null)
  const [imgOk, setImgOk] = useState(true)

  // Parallax sutil de la foto (capa propia, sin conflicto con framer)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        photoRef.current,
        { y: 50 },
        {
          y: -50,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        }
      )
    })
    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="nosotros" className="overflow-hidden py-[100px] bg-stage-soft">
      <Beam from="yellow" to="cyan" />
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <SectionHeading
          eyebrow="Quiénes somos"
          lead="Sobre"
          accentWord="Nosotros"
          accentColor="yellow"
          align="left"
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Foto editorial 7/12 con parallax */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div ref={photoRef} className="relative will-change-transform">
              <div
                className="absolute -inset-8 rounded-[32px] bg-[radial-gradient(ellipse_at_center,rgba(0,188,212,0.18)_0%,rgba(233,30,99,0.1)_50%,transparent_70%)] blur-2xl"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                {imgOk ? (
                  <motion.img
                    src="/images/team.jpg"
                    alt="Equipo de CMY Producciones en evento en vivo"
                    className="w-full h-[300px] md:h-[440px] object-cover"
                    onError={() => setImgOk(false)}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                ) : (
                  <div className="w-full h-[300px] md:h-[440px] flex flex-col items-center justify-center gap-4 bg-stage-card text-center px-8">
                    <span className="inline-flex gap-1.5" aria-hidden="true">
                      <i className="gel-dot gel-dot--cyan" />
                      <i className="gel-dot gel-dot--magenta" />
                      <i className="gel-dot gel-dot--yellow" />
                    </span>
                    <p className="text-zinc-400 text-[0.95rem]">
                      Agrega tu foto aquí
                      <span className="block text-zinc-600 text-[0.85rem] mt-1">
                        public/images/team.jpg
                      </span>
                    </p>
                  </div>
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                <div className="absolute bottom-5 left-5 flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-gel-magenta shadow-[0_0_12px_rgba(233,30,99,0.9)] animate-pulse" />
                  <span className="text-[0.85rem] font-semibold tracking-wide">NUESTRO EQUIPO EN ACCIÓN</span>
                </div>
              </div>

              <motion.div
                className="absolute -left-4 md:-left-8 -bottom-6 flex items-center gap-3 rounded-xl border border-white/10 bg-stage-control/90 backdrop-blur-md px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-[1.6rem] font-bold text-gel-gradient tabular-nums">150+</span>
                <span className="text-zinc-400 text-[0.85rem] leading-tight">
                  eventos
                  <br />
                  en vivo
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Manifiesto + stats 5/12 */}
          <div className="lg:col-span-5">
            <motion.p
              className="border-l-[3px] border-gel-yellow pl-5 text-[1.35rem] leading-snug font-medium text-white mb-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Convertimos luces, sonido y video en el recuerdo que tu público se lleva a casa.
            </motion.p>
            <motion.div
              className="text-zinc-400 text-[1.02rem] space-y-4 mb-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            >
              <p>
                En <strong className="text-white font-semibold">CMY Producciones</strong> combinamos
                tecnología de vanguardia con un equipo humano apasionado por la producción audiovisual.
              </p>
              <p>
                Desde conciertos masivos hasta eventos corporativos íntimos, nos encargamos de cada
                detalle técnico para que tú solo te preocupes de disfrutar.
              </p>
            </motion.div>
            <div>
              {STATS.map((s, i) => (
                <StatRow key={s.label} stat={s} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Marquee de tipos de evento */}
        <div className="relative mt-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-track">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} className="flex items-center gap-12 pr-12" aria-hidden={i >= MARQUEE.length}>
                <span className={`text-[1.9rem] font-bold uppercase tracking-wide whitespace-nowrap ${i % 2 === 0 ? 'text-outline' : 'text-zinc-700'}`}>
                  {item}
                </span>
                <i className={`h-2 w-2 rounded-full shrink-0 ${i % 3 === 0 ? 'bg-gel-cyan' : i % 3 === 1 ? 'bg-gel-magenta' : 'bg-gel-yellow'}`} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Nosotros
