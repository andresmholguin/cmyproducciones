import { test, expect } from '@playwright/test'

test.describe('Landing Page - CMY Producciones', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Carga inicial, metadata y Hero visibles', async ({ page }) => {
    // Título de la página
    await expect(page).toHaveTitle(/CMY Producciones/)

    // Logo en la cabecera
    const logo = page.locator('header a img[alt="CMY Producciones"]')
    await expect(logo).toBeVisible()

    // Titular del Hero
    const h1 = page.locator('#hero h1')
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('Tu evento')

    // Botón principal CTA
    const ctaButton = page.locator('#hero a[href="#contacto"]:has-text("Solicitar Presupuesto")')
    await expect(ctaButton).toBeVisible()
  })

  test('Navegación y enlaces del Header', async ({ page }) => {
    const navLinks = page.locator('header nav ul a')
    await expect(navLinks).toHaveCount(5) // Inicio, Servicios, Galería, Nosotros, Contacto

    const expectedHrefs = ['#hero', '#servicios', '#galeria', '#nosotros', '#contacto']
    for (let i = 0; i < expectedHrefs.length; i++) {
      await expect(navLinks.nth(i)).toHaveAttribute('href', expectedHrefs[i])
    }
  })

  test('Selector interactivo de Servicios cambia información e imagen', async ({ page }) => {
    const serviciosSection = page.locator('#servicios')
    await serviciosSection.scrollIntoViewIfNeeded()

    // Botones de la lista de servicios
    const botones = serviciosSection.locator('button[aria-pressed]')
    await expect(botones).toHaveCount(4)

    // Por defecto el servicio 01 (Luces) está seleccionado
    await expect(botones.nth(0)).toHaveAttribute('aria-pressed', 'true')
    const panelTitulo = serviciosSection.locator('h3')
    await expect(panelTitulo).toHaveText('Luces')

    // Cambiar al servicio 02 (Sonido)
    await botones.nth(1).click()
    await expect(botones.nth(1)).toHaveAttribute('aria-pressed', 'true')
    await expect(panelTitulo).toHaveText('Sonido')
    const sonidoImg = serviciosSection.locator('img[src*="event5.webp"]')
    await expect(sonidoImg).toBeVisible()

    // Cambiar al servicio 03 (Pantallas LED)
    await botones.nth(2).click()
    await expect(botones.nth(2)).toHaveAttribute('aria-pressed', 'true')
    await expect(panelTitulo).toHaveText('Pantallas LED')
    const pantallasImg = serviciosSection.locator('img[src*="event6.webp"]')
    await expect(pantallasImg).toBeVisible()

    // Cambiar al servicio 04 (Efectos Especiales)
    await botones.nth(3).click()
    await expect(botones.nth(3)).toHaveAttribute('aria-pressed', 'true')
    await expect(panelTitulo).toHaveText('Efectos Especiales')
    const efectosImg = serviciosSection.locator('img[src*="event4.webp"]')
    await expect(efectosImg).toBeVisible()
  })

  test('Galería de eventos renderiza imágenes WebP optimizadas', async ({ page }) => {
    const galeria = page.locator('#galeria')
    await galeria.scrollIntoViewIfNeeded()

    const cards = galeria.locator('img')
    await expect(cards).toHaveCount(6)

    // Verificar que todas las imágenes de la galería usan formato .webp
    for (let i = 0; i < 6; i++) {
      const src = await cards.nth(i).getAttribute('src')
      expect(src).toMatch(/\.webp$/)
    }
  })

  test('Sección Nosotros muestra foto del equipo en WebP y estadísticas', async ({ page }) => {
    const nosotros = page.locator('#nosotros')
    await nosotros.scrollIntoViewIfNeeded()

    // Foto del equipo
    const teamImg = nosotros.locator('img[src="/images/team.webp"]')
    await expect(teamImg).toBeVisible()

    // Estadísticas
    await expect(nosotros).toContainText('Eventos realizados')
    await expect(nosotros).toContainText('Años de experiencia')
    await expect(nosotros).toContainText('Clientes satisfechos')
  })

  test('Acordeón de FAQ expande respuestas y tiene número correcto', async ({ page }) => {
    const faq = page.locator('#faq')
    await faq.scrollIntoViewIfNeeded()

    const details = faq.locator('details')
    await expect(details).toHaveCount(6)

    // El primer FAQ
    const firstDetail = details.first()
    await expect(firstDetail).not.toHaveAttribute('open', '')
    await firstDetail.locator('summary').click()
    await expect(firstDetail).toHaveAttribute('open', '')
    await expect(firstDetail).toContainText('Luces e iluminación escénica')

    // FAQ con número de WhatsApp verificado
    await expect(faq).toContainText('314 700 6083')
    await expect(faq).not.toContainText('314 700 0083')
  })

  test('Botón flotante de WhatsApp apunta al número oficial', async ({ page }) => {
    const waButton = page.locator('a[aria-label="Contactar por WhatsApp"]')
    await expect(waButton).toBeVisible()

    const href = await waButton.getAttribute('href')
    expect(href).toContain('wa.me/573147006083')
    expect(href).toContain('text=')
  })

  test('Formulario de contacto valida campos requeridos', async ({ page }) => {
    const form = page.locator('#contacto form')
    await form.scrollIntoViewIfNeeded()

    const submitBtn = form.locator('button[type="submit"]')
    await expect(submitBtn).toBeVisible()

    // Inputs requeridos
    const nameInput = form.locator('input[name="name"]')
    const emailInput = form.locator('input[name="email"]')
    const eventTypeSelect = form.locator('select[name="eventType"]')
    const messageInput = form.locator('textarea[name="message"]')

    await expect(nameInput).toHaveAttribute('required', '')
    await expect(emailInput).toHaveAttribute('required', '')
    await expect(eventTypeSelect).toHaveAttribute('required', '')
    await expect(messageInput).toHaveAttribute('required', '')

    // Al intentar enviar vacío, el navegador no permite el submit nativo
    await submitBtn.click()
    const isNameInvalid = await nameInput.evaluate((el) => !el.checkValidity())
    expect(isNameInvalid).toBe(true)
  })

  test('Secuencia de fondo en canvas avanza y actualiza fotogramas al hacer scroll', async ({ page }) => {
    const canvas = page.locator('canvas.seq-canvas')
    await expect(canvas).toBeVisible()

    // Comprobar que el canvas tiene dimensiones válidas
    const box = await canvas.boundingBox()
    expect(box.width).toBeGreaterThan(0)
    expect(box.height).toBeGreaterThan(0)

    // Obtener datos de píxel en la posición inicial (y=0)
    const initialPixel = await page.evaluate(() => {
      const c = document.querySelector('canvas.seq-canvas')
      const ctx = c.getContext('2d')
      return Array.from(ctx.getImageData(Math.floor(c.width / 2), Math.floor(c.height / 2), 1, 1).data)
    })

    // Desplazar hacia abajo dentro del recorrido de la secuencia
    await page.evaluate(() => window.scrollTo(0, 1500))
    await page.waitForTimeout(600)

    // Obtener datos de píxel en el scroll
    const scrolledPixel = await page.evaluate(() => {
      const c = document.querySelector('canvas.seq-canvas')
      const ctx = c.getContext('2d')
      return Array.from(ctx.getImageData(Math.floor(c.width / 2), Math.floor(c.height / 2), 1, 1).data)
    })

    // Comprobar que el fotograma en el canvas cambió activamente con el scroll
    expect(scrolledPixel).not.toEqual(initialPixel)
  })
})
