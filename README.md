# CMY PRODUCCIONES - Landing Page (React + Vite)

## Stack
- **React 18** + **Vite 5**
- **Framer Motion** (animaciones: typewriter, parallax, reveals, tilt 3D)
- **CSS Modules** (estilos encapsulados por componente)

## Comandos
```bash
npm install   # instalar dependencias
npm run dev   # servidor de desarrollo (http://localhost:5173)
npm run build # build de producción (carpeta dist/)
npm run preview # previsualizar el build
```

## Personalización (`src/config.js`)
Toda la configuración está centralizada en `src/config.js`:
- `WHATSAPP_NUMBER` — número del botón flotante (actual: 573147006083)
- `WHATSAPP_MESSAGE` — mensaje predefinido
- `FORMSPREE_ENDPOINT` — reemplaza `YOUR_FORM_ID` con tu ID de https://formspree.io
- `SOCIAL_LINKS` — URLs de Instagram y Facebook
- `CONTACT_EMAIL` — email de fallback del formulario

## Imágenes
Coloca en `public/images/`:
- `logo-dark.svg` — logo de la empresa en versión dark (nav). Ya incluido ✅
- `icon.svg` (en `public/`) — favicon con los 3 geles. Ya incluido ✅
- `gallery/event1.jpg` ... `event6.jpg` — fotos de eventos (recomendado 800x500px)
- `nosotros-concierto.jpg` — foto de concierto/super evento para la sección Nosotros (recomendado 900x1100px vertical, o 1200x900px)
- `sequence/frame-001.webp` ... `frame-085.webp` — secuencia del hero (80 frames del video + 5 de fundido a `#0e0e11`, el fondo de Nosotros). Se controla con el scroll (scrub sobre canvas sticky), NO es un `<video>`

## Regenerar la secuencia del hero
Con ffmpeg (o el binario de `ffmpeg-static`):
```bash
ffmpeg -y -i public/hero.mp4 -vf "fps=8" -c:v libwebp -quality 72 "public/images/sequence/frame-%03d.webp"
```
- `fps=8` sobre ~10s de video = ~80 frames
- Peso total aprox: 3.8MB (carga progresiva, el frame 0 pinta primero)
- El `hero.mp4` original NO se embarca en el build (la animación usa solo la secuencia)

## Estructura
```
src/
├── main.jsx, App.jsx, index.css, config.js
├── hooks/useAnimations.js   # useTypewriter, useCounter, useTilt, useReveal
└── components/
    ├── Header/    # nav sticky + menú móvil animado
    ├── Hero/      # typewriter + partículas + parallax al scroll
    ├── Servicios/ # cards con tilt 3D + stagger reveal
    ├── Galeria/   # reveal con blur + hover zoom
    ├── Nosotros/  # contadores + glow con parallax
    ├── Contacto/  # form animado + spinner + estados
    ├── Footer/
    └── WhatsApp/  # botón flotante con pulso
```
