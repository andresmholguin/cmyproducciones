import { motion } from 'framer-motion'
import { useMagnetic } from '../../hooks/useMagnetic.js'

const SIZES = {
  lg: 'px-10 py-4 text-[1.1rem] rounded-lg',
  sm: 'px-[18px] py-2.5 text-[0.95rem] rounded-md',
}

const BASE =
  'group relative inline-flex w-full h-full items-center justify-center overflow-hidden border border-white/15 bg-stage-control font-semibold text-white cursor-pointer transition-[border-color,box-shadow] duration-200 hover:border-white/30 hover:shadow-[0_8px_30px_rgba(0,188,212,0.12),0_8px_30px_rgba(233,30,99,0.12)] active:scale-[0.97] disabled:opacity-70 disabled:cursor-wait'

// Botón signature: superficie oscura + barra tricolor con los 3 geles del logo.
// El wrapper externo es magnético (GSAP); el interno conserva micro-motion framer.
function GelButton({ href, type, disabled, size = 'lg', className = '', children, ...motionProps }) {
  const magnetRef = useMagnetic(0.3)
  const classes = `${BASE} ${SIZES[size]}`
  const bar = (
    <span
      className="absolute top-0 left-0 h-[3px] w-full bg-[linear-gradient(90deg,var(--color-gel-cyan)_0_33%,var(--color-gel-magenta)_33%_66%,var(--color-gel-yellow)_66%_100%)]"
      aria-hidden="true"
    />
  )
  const mergedProps = {
    whileHover: { y: -2 },
    whileTap: { scale: 0.97 },
    ...motionProps,
  }

  const inner = href ? (
    <motion.a href={href} className={classes} {...mergedProps}>
      {bar}
      {children}
    </motion.a>
  ) : (
    <motion.button type={type} disabled={disabled} className={classes} {...mergedProps}>
      {bar}
      {children}
    </motion.button>
  )

  return (
    <div ref={magnetRef} className={`inline-block ${className}`}>
      {inner}
    </div>
  )
}

export default GelButton
