import { motion } from 'framer-motion'

const BEAMS = {
  'cyan-magenta':
    'bg-[linear-gradient(90deg,transparent,#00bcd4_30%,#e91e63_70%,transparent)] shadow-[0_0_16px_rgba(0,188,212,0.45),0_0_32px_rgba(233,30,99,0.25)]',
  'magenta-yellow':
    'bg-[linear-gradient(90deg,transparent,#e91e63_30%,#ffc107_70%,transparent)] shadow-[0_0_16px_rgba(233,30,99,0.45),0_0_32px_rgba(255,193,7,0.25)]',
  'yellow-cyan':
    'bg-[linear-gradient(90deg,transparent,#ffc107_30%,#00bcd4_70%,transparent)] shadow-[0_0_16px_rgba(255,193,7,0.4),0_0_32px_rgba(0,188,212,0.25)]',
}

// Signature: haz de luz que corta la penumbra entre secciones.
function Beam({ from = 'cyan', to = 'magenta' }) {
  return (
    <div className="flex justify-center" aria-hidden="true">
      <motion.span
        className={`block w-[min(560px,70%)] h-[2px] rounded-full origin-center ${BEAMS[`${from}-${to}`]}`}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
      />
    </div>
  )
}

export default Beam
