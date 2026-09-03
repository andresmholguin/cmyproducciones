import { motion } from 'framer-motion'
import SectionHeading from '../SectionHeading/SectionHeading.jsx'
import Beam from '../Beam/Beam.jsx'

const EVENTOS = [
  { src: '/images/gallery/event1.webp', alt: 'Concierto - Producción de luces y sonido', tag: 'Concierto' },
  { src: '/images/gallery/event2.webp', alt: 'Evento corporativo - Pantallas LED', tag: 'Corporativo' },
  { src: '/images/gallery/event3.webp', alt: 'Show en vivo - Efectos especiales', tag: 'Show en vivo' },
  { src: '/images/gallery/event4.webp', alt: 'Festival - Producción integral', tag: 'Festival' },
  { src: '/images/gallery/event5.webp', alt: 'Evento social - Iluminación ambiental', tag: 'Evento Social' },
  { src: '/images/gallery/event6.webp', alt: 'Evento deportivo - Pantallas LED gigantes', tag: 'Deportivo' },
]

const TAG_DOTS = ['bg-gel-cyan', 'bg-gel-yellow', 'bg-gel-magenta']

function GaleriaItem({ evento, index }) {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden aspect-[16/10] cursor-pointer bg-stage-card"
      initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.07, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.03, zIndex: 2 }}
    >
      <motion.img
        src={evento.src}
        alt={evento.alt}
        loading="lazy"
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <span className="img-outline absolute inset-0 rounded-xl pointer-events-none" aria-hidden="true" />
      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 backdrop-blur-md px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-zinc-200 pointer-events-none">
        <i className={`h-1.5 w-1.5 rounded-full ${TAG_DOTS[index % TAG_DOTS.length]}`} aria-hidden="true" />
        {evento.tag}
      </span>
    </motion.div>
  )
}

function Galeria() {
  return (
    <section id="galeria" className="relative py-[100px]">
      <Beam from="magenta" to="yellow" />
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <div className="relative rounded-[28px] border border-white/10 bg-black/30 backdrop-blur-xl px-6 py-10 md:px-10 md:py-12 shadow-[0_0_80px_rgba(0,188,212,0.10),0_0_160px_rgba(255,193,7,0.07)]">
          <SectionHeading
            eyebrow="Trabajo real"
            lead="Nuestros"
            accentWord="Eventos"
            accentColor="magenta"
            subtitle="Mira lo que hemos logrado juntos"
          />
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {EVENTOS.map((e, i) => (
              <GaleriaItem key={e.src} evento={e} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Galeria
