import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '../../lib/gsap.js'

const FRAME_COUNT = 85
const frameSrc = (i) => `/images/sequence/frame-${String(i + 1).padStart(3, '0')}.webp`

// Fondo de secuencia compartido hero → servicios → galería.
// Canvas sticky (sin pin): el contenido hace scroll sobre él
// mientras los frames avanzan ligados al scroll total.
function SequenceBackground({ children }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const framesRef = useRef([])
  const currentRef = useRef(-1)
  const targetFrameRef = useRef(0)

  const drawFrame = (idx) => {
    const canvas = canvasRef.current
    const img = framesRef.current[idx]
    if (!canvas || !img || !img.complete || !img.naturalWidth) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const cw = canvas.clientWidth
    const ch = canvas.clientHeight
    if (!cw || !ch) return
    if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) {
      canvas.width = Math.round(cw * dpr)
      canvas.height = Math.round(ch * dpr)
    }
    const sAspect = img.naturalWidth / img.naturalHeight
    const cAspect = canvas.width / canvas.height
    let sw, sh, sx, sy
    if (sAspect > cAspect) {
      sh = img.naturalHeight
      sw = sh * cAspect
      sx = (img.naturalWidth - sw) / 2
      sy = 0
    } else {
      sw = img.naturalWidth
      sh = sw / cAspect
      sx = 0
      sy = (img.naturalHeight - sh) / 2
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
    currentRef.current = idx
  }

  useGSAP(() => {
    const imgs = []
    for (let i = 0; i < FRAME_COUNT; i += 1) {
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => {
        if (i === 0 && currentRef.current === -1) {
          drawFrame(0)
        } else if (targetFrameRef.current === i) {
          drawFrame(i)
        }
      }
      img.src = frameSrc(i)
      imgs.push(img)
    }
    framesRef.current = imgs

    // Intentar pintar el frame 0 si ya está cargado
    drawFrame(0)

    const onResize = () => drawFrame(currentRef.current < 0 ? 0 : currentRef.current)
    window.addEventListener('resize', onResize)

    const mm = gsap.matchMedia()
    const createTimeline = (isReduced) => {
      const state = { frame: 0 }
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      })
      tl.to(state, {
        frame: FRAME_COUNT - 1,
        duration: 10,
        onUpdate: () => {
          const f = Math.round(state.frame)
          targetFrameRef.current = f
          if (f !== currentRef.current) drawFrame(f)
        },
      }, 0)
        .to('.hero-text', { autoAlpha: 0, y: isReduced ? 0 : -40, duration: 1, overwrite: 'auto' }, 0)
        .to('.hero-glass', { autoAlpha: 0, scale: isReduced ? 1 : 0.98, duration: 1.2, overwrite: 'auto' }, 1.0)
        .to('.hero-scroll', { autoAlpha: 0, duration: 0.5, overwrite: 'auto' }, 0)
        .fromTo('.seq-canvas', { scale: 1 }, { scale: isReduced ? 1 : 1.08, duration: 10 }, 0)
        .fromTo('.seq-veil-end', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.5 }, 8.5)
    }

    mm.add('(prefers-reduced-motion: no-preference)', () => createTimeline(false))
    mm.add('(prefers-reduced-motion: reduce)', () => createTimeline(true))

    ScrollTrigger.refresh()

    return () => {
      window.removeEventListener('resize', onResize)
      mm.revert()
    }
  }, { scope: wrapRef })

  return (
    <div ref={wrapRef} className="relative">
      <div className="sticky top-0 h-screen h-[100svh] overflow-hidden" aria-hidden="true">
        <canvas ref={canvasRef} className="seq-canvas absolute inset-0 h-full w-full bg-stage" />
        <div className="absolute inset-0 bg-black/55 pointer-events-none" />
        <div className="seq-veil-end absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-stage-soft to-transparent opacity-0 pointer-events-none" />
      </div>
      <div className="relative z-[1] -mt-[100svh]">
        {children}
      </div>
    </div>
  )
}

export default SequenceBackground
