import { useEffect } from 'react'
import { ScrollTrigger } from './lib/gsap.js'
import SequenceBackground from './components/SequenceBackground/SequenceBackground.jsx'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import Servicios from './components/Servicios/Servicios.jsx'
import Galeria from './components/Galeria/Galeria.jsx'
import Nosotros from './components/Nosotros/Nosotros.jsx'
import Faq from './components/Faq/Faq.jsx'
import Contacto from './components/Contacto/Contacto.jsx'
import Footer from './components/Footer/Footer.jsx'
import WhatsApp from './components/WhatsApp/WhatsApp.jsx'

function App() {
  useEffect(() => {
    ScrollTrigger.refresh()
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      <Header />
      <main>
        <SequenceBackground>
          <Hero />
          <Servicios />
          <Galeria />
        </SequenceBackground>
        <Nosotros />
        <Faq />
        <Contacto />
      </main>
      <Footer />
      <WhatsApp />
    </>
  )
}

export default App
