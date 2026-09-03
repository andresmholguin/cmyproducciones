import { motion } from 'framer-motion'
import { SOCIAL_LINKS } from '../../config.js'

const InstagramIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const FacebookIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const SOCIAL_BASE =
  'w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-400 transition-[background-color,color,border-color,box-shadow,transform] duration-300 hover:border-transparent hover:text-white'

const SOCIAL_HOVER = {
  instagram:
    'hover:bg-[linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)] hover:shadow-[0_8px_24px_rgba(238,42,123,0.4)]',
  facebook: 'hover:bg-[#1877f2] hover:shadow-[0_8px_24px_rgba(24,119,242,0.4)]',
}

function Footer() {
  return (
    <footer className="pt-[60px] pb-[30px] bg-stage-soft border-t border-white/10">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <img src="/images/logo-dark.svg" alt="CMY Producciones" className="h-12 w-auto" />
            <p className="text-zinc-400 text-[0.9rem] mt-2">Tu evento, nuestra producción</p>
          </div>
          <div className="flex gap-4">
            <motion.a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`${SOCIAL_BASE} ${SOCIAL_HOVER.instagram}`}
              aria-label="Instagram"
              whileHover={{ y: -4, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {InstagramIcon}
            </motion.a>
            <motion.a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={`${SOCIAL_BASE} ${SOCIAL_HOVER.facebook}`}
              aria-label="Facebook"
              whileHover={{ y: -4, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {FacebookIcon}
            </motion.a>
          </div>
        </motion.div>
        <div className="text-center pt-[30px] border-t border-white/10 text-zinc-500 text-[0.85rem]">
          <p>&copy; 2026 CMY Producciones. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
