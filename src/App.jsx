import { useEffect, useRef } from 'react'
import { ScrollTrigger } from './lib/gsap.js'
import SequenceBackground from './components/SequenceBackground/SequenceBackground.jsx'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import Servicios from './components/Servicios/Servicios.jsx'
import Galeria from './components/Galeria/Galeria.jsx'
import Nosotros from './components/Nosotros/Nosotros.jsx'
import Contacto from './components/Contacto/Contacto.jsx'
import Footer from './components/Footer/Footer.jsx'
import WhatsApp from './components/WhatsApp/WhatsApp.jsx'

function App() {
  const wrapRef = useRef(null)

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      <Header />
      <main>
        <div ref={wrapRef} className="relative">
          <SequenceBackground wrapRef={wrapRef} />
          <div className="relative z-[1] -mt-[100svh]">
            <Hero />
            <Servicios />
            <Galeria />
          </div>
        </div>
        <Nosotros />
        <Contacto />
      </main>
      <Footer />
      <WhatsApp />
    </>
  )
}

export default App
