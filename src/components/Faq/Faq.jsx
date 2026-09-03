import { motion } from 'framer-motion'
import SectionHeading from '../SectionHeading/SectionHeading.jsx'
import Beam from '../Beam/Beam.jsx'

const FAQS = [
  {
    q: '¿Qué equipos alquila CMY Producciones?',
    a: 'Luces e iluminación escénica, equipos de sonido profesional, pantallas LED de varios tamaños y efectos especiales como láser, humo y confeti.',
  },
  {
    q: '¿Qué tipos de eventos cubren?',
    a: 'Conciertos y festivales, eventos corporativos, teatro y shows en vivo, eventos sociales como bodas y fiestas, y eventos deportivos.',
  },
  {
    q: '¿Dónde operan?',
    a: 'Tenemos nuestra base en Cali, Colombia. Escríbenos con la ubicación de tu evento y coordinamos la logística.',
  },
  {
    q: '¿Cómo solicito un presupuesto?',
    a: 'Con el formulario de contacto de esta página o por WhatsApp al 314 700 6083, contándonos la fecha, el lugar y el tipo de evento.',
  },
  {
    q: '¿Con cuánta anticipación debo reservar?',
    a: 'Te recomendamos escribirnos lo antes posible, ya que la disponibilidad de equipos varía según la fecha. Cuéntanos la fecha de tu evento y verificamos disponibilidad.',
  },
  {
    q: '¿El servicio incluye montaje y personal técnico?',
    a: 'Coordinamos el montaje, la operación durante el evento y el desmontaje según las necesidades de cada producción. Cuéntanos los detalles de tu evento para organizarlo.',
  },
]

function Faq() {
  return (
    <section id="faq" className="py-[100px] bg-stage-soft">
      <Beam from="magenta" to="yellow" />
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <div className="relative rounded-[28px] border border-white/10 bg-black/30 backdrop-blur-xl px-6 py-10 md:px-10 md:py-12 shadow-[0_0_80px_rgba(233,30,99,0.08),0_0_160px_rgba(255,193,7,0.06)]">
          <SectionHeading
            eyebrow="Resolvemos tus dudas"
            lead="Preguntas"
            accentWord="frecuentes"
            accentColor="magenta"
            subtitle="Lo que nos preguntan antes de cotizar"
          />
          <div className="max-w-[760px] mx-auto flex flex-col gap-3">
            {FAQS.map((item, i) => (
              <motion.details
                key={item.q}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 open:bg-white/[0.06] transition-colors duration-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: 'easeOut' }}
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-[1.02rem] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-white/15 text-zinc-300 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </summary>
                <p className="text-zinc-400 text-[0.95rem] leading-relaxed pt-3 pr-10">
                  {item.a}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq
