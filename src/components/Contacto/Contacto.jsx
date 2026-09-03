import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FORM_ENDPOINT, CONTACT_EMAIL } from '../../config.js'
import SectionHeading from '../SectionHeading/SectionHeading.jsx'
import Beam from '../Beam/Beam.jsx'
import GelButton from '../GelButton/GelButton.jsx'
import ScrollOrb from '../ScrollOrb/ScrollOrb.jsx'

const EVENT_TYPES = [
  'Concierto / Festival',
  'Evento corporativo',
  'Teatro / Show en vivo',
  'Evento social (boda, fiesta)',
  'Evento deportivo',
  'Otro',
]

const fieldVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
  }),
}

const INPUT_BASE =
  'w-full px-[18px] py-3.5 bg-stage-control border border-white/10 rounded-[10px] text-white text-[1rem] placeholder:text-zinc-600 transition-[border-color,box-shadow,transform] duration-300 focus:outline-none focus:border-gel-cyan focus:shadow-[0_0_0_3px_rgba(0,188,212,0.15),0_0_20px_rgba(0,188,212,0.1)] focus:-translate-y-[1px] user-invalid:border-gel-magenta/60'

const STATUS_STYLES = {
  success: 'bg-wa/10 border border-wa/40 text-green-400',
  error: 'bg-gel-magenta/10 border border-gel-magenta/40 text-pink-400',
  info: 'bg-gel-cyan/10 border border-gel-cyan/40 text-cyan-300',
}

function Contacto() {
  const [status, setStatus] = useState({ type: null, message: '' })
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    const firstEmpty = ['name', 'email', 'eventType', 'message'].find((f) => !data[f]?.trim())
    if (firstEmpty) {
      setStatus({ type: 'error', message: 'Por favor completa todos los campos requeridos.' })
      form.querySelector(`[name="${firstEmpty}"]`)?.focus()
      return
    }

    setStatus({ type: null, message: '' })
    setSending(true)
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      const result = await response.json().catch(() => ({}))
      if (response.ok && result.success !== false) {
        setStatus({ type: 'success', message: '¡Mensaje enviado correctamente! Te contactaremos pronto.' })
        e.target.reset()
      } else {
        throw new Error('Error en el envío')
      }
    } catch {
      const subject = encodeURIComponent(`Solicitud de presupuesto - ${data.eventType}`)
      const body = encodeURIComponent(
        `Nombre: ${data.name}\nEmail: ${data.email}\nTeléfono: ${data.phone || 'No especificado'}\nTipo de evento: ${data.eventType}\n\nMensaje:\n${data.message}`
      )
      window.open(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`, '_blank')
      setStatus({ type: 'info', message: 'Abriendo tu cliente de email para completar el envío.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contacto" className="relative overflow-hidden py-[100px] bg-stage">
      <ScrollOrb className="left-[-120px] bottom-[10%] h-[380px] w-[380px] bg-gel-yellow/[0.07]" fromY={-50} toY={50} />
      <Beam from="cyan" to="magenta" />
      <div className="relative w-[90%] max-w-[1200px] mx-auto">
        <SectionHeading
          eyebrow="Cotiza tu evento"
          lead="Solicita tu"
          accentWord="Presupuesto"
          accentColor="cyan"
          subtitle="Cuéntanos sobre tu evento y te contactaremos pronto"
        />

        <motion.form
          className="max-w-[640px] w-[90%] mx-auto flex flex-col gap-6"
          onSubmit={handleSubmit}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <input type="hidden" name="_subject" value="Nueva solicitud de presupuesto — CMY Producciones" />
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="text"
            name="_honey"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <motion.div variants={fieldVariants} custom={0}>
            <label className="block font-medium mb-2 text-[0.95rem]" htmlFor="name">Nombre completo *</label>
            <input id="name" name="name" className={INPUT_BASE} required placeholder="Tu nombre" autoComplete="name" />
          </motion.div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <motion.div variants={fieldVariants} custom={1}>
              <label className="block font-medium mb-2 text-[0.95rem]" htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" className={INPUT_BASE} required placeholder="tu@email.com" autoComplete="email" inputMode="email" />
            </motion.div>
            <motion.div variants={fieldVariants} custom={2}>
              <label className="block font-medium mb-2 text-[0.95rem]" htmlFor="phone">Teléfono</label>
              <input id="phone" name="phone" type="tel" className={INPUT_BASE} placeholder="+57 300 123 4567" autoComplete="tel" inputMode="tel" />
            </motion.div>
          </div>

          <motion.div variants={fieldVariants} custom={3}>
            <label className="block font-medium mb-2 text-[0.95rem]" htmlFor="eventType">Tipo de evento *</label>
            <select id="eventType" name="eventType" className={`${INPUT_BASE} select-arrow cursor-pointer`} required defaultValue="">
              <option value="" disabled>Selecciona una opción</option>
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t} className="bg-stage-card">{t}</option>
              ))}
            </select>
          </motion.div>

          <motion.div variants={fieldVariants} custom={4}>
            <label className="block font-medium mb-2 text-[0.95rem]" htmlFor="message">Cuéntanos sobre tu evento *</label>
            <textarea
              id="message"
              name="message"
              className={`${INPUT_BASE} min-h-[140px] resize-y`}
              required
              placeholder="Fecha, lugar, número de asistentes, servicios que necesitas..."
            />
          </motion.div>

          <GelButton
            type="submit"
            size="lg"
            className="w-full min-h-[56px]"
            variants={fieldVariants}
            custom={5}
            disabled={sending}
          >
            {sending ? <span className="spinner" /> : 'Enviar Solicitud'}
          </GelButton>

          <AnimatePresence>
            {status.type ? (
              <motion.p
                role="status"
                className={`text-center px-[18px] py-3.5 rounded-[10px] text-[0.95rem] ${STATUS_STYLES[status.type]}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {status.message}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  )
}

export default Contacto
