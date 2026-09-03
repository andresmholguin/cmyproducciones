import { motion } from 'framer-motion'

const ACCENTS = {
  cyan: 'text-gel-cyan',
  magenta: 'text-gel-magenta',
  yellow: 'text-gel-yellow',
}

// Eyebrow con el trío de geles del logo + título focal + subtítulo.
function SectionHeading({ eyebrow, lead, accentWord, accentColor = 'cyan', subtitle, align = 'center' }) {
  const left = align === 'left'

  return (
    <div className={`mb-14 [filter:drop-shadow(0_2px_16px_rgba(0,0,0,0.9))] ${left ? 'text-left' : 'text-center'}`}>
      <motion.p
        className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-zinc-400 mb-[18px]"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <span className="inline-flex gap-1" aria-hidden="true">
          <i className="gel-dot gel-dot--cyan" />
          <i className="gel-dot gel-dot--magenta" />
          <i className="gel-dot gel-dot--yellow" />
        </span>
        {eyebrow}
      </motion.p>
      <motion.h2
        className="text-[clamp(1.9rem,4.5vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-3.5"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
      >
        {lead} <span className={ACCENTS[accentColor]}>{accentWord}</span>
      </motion.h2>
      {subtitle ? (
        <motion.p
          className={`text-zinc-400 text-[1.05rem] max-w-[560px] ${left ? '' : 'mx-auto'}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  )
}

export default SectionHeading
