import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GelButton from '../GelButton/GelButton.jsx'

const LINKS = [
  { href: '#hero', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#galeria', label: 'Galería' },
  { href: '#nosotros', label: 'Nosotros' },
]

const LINK_BASE =
  'px-[18px] py-2.5 rounded-md font-medium text-[0.95rem] text-zinc-400 transition-[color,background-color,transform,box-shadow] duration-200 hover:text-white hover:bg-white/5 active:scale-[0.97]'

function Header() {
  const [open, setOpen] = useState(false)

  const scrollTo = (e, href) => {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-[1000] bg-stage/85 backdrop-blur-xl border-b border-white/10"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav className="w-[90%] max-w-[1200px] mx-auto flex items-center justify-between h-20">
        <a href="#hero" className="flex items-center z-[1002] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:scale-[0.98]" onClick={(e) => scrollTo(e, '#hero')} aria-label="CMY Producciones - Inicio">
          <img src="/images/logo-dark.svg" alt="CMY Producciones" className="h-11 w-auto" />
        </a>

        <button
          className="flex md:hidden flex-col gap-[5px] bg-transparent border-0 cursor-pointer z-[1002] p-[5px]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          <span
            className={`w-7 h-0.5 bg-white transition-[transform,opacity] duration-300 ${
              open ? 'rotate-45 translate-x-[0px] translate-y-[7px]' : ''
            }`}
          />
          <span className={`w-7 h-0.5 bg-white transition-[transform,opacity] duration-300 ${open ? 'opacity-0' : ''}`} />
          <span
            className={`w-7 h-0.5 bg-white transition-[transform,opacity] duration-300 ${
              open ? '-rotate-45 translate-x-[0px] -translate-y-[7px]' : ''
            }`}
          />
        </button>

        <ul
          className={`flex items-center gap-2 list-none fixed md:static top-0 ${
            open ? 'right-0' : '-right-full md:right-auto'
          } w-[80%] max-w-[320px] md:w-auto md:max-w-none h-screen md:h-auto bg-stage-soft md:bg-transparent flex-col md:flex-row justify-center gap-5 md:gap-2 transition-[right] duration-300 border-l md:border-0 border-white/10 z-[1001]`}
        >
          {LINKS.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <a href={link.href} className={LINK_BASE} onClick={(e) => scrollTo(e, link.href)}>
                {link.label}
              </a>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62 }}
          >
            <GelButton href="#contacto" size="sm" onClick={(e) => scrollTo(e, '#contacto')}>
              Contacto
            </GelButton>
          </motion.li>
        </ul>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 bg-black/50 z-[1000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
