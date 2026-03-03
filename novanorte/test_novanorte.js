const { chromium } = require('playwright');
const assert = require('assert');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + __dirname + '/index.html');

  // 1. Header visible
  const header = await page.$('header');
  assert(header, '✗ FAIL: Header no encontrado');
  console.log('✓ Header presente');

  // 2. Logo presente
  const logo = await page.$('header img[alt*="NovaNorte"]');
  assert(logo, '✗ FAIL: Logo no encontrado en header');
  console.log('✓ Logo presente');

  // 3. H1 correcto
  const h1 = await page.$eval('h1', el => el.textContent);
  assert(h1.includes('NovaNorte'), '✗ FAIL: H1 no menciona NovaNorte');
  console.log('✓ H1 correcto: ' + h1.trim().replace(/\s+/g, ' '));

  // 4. CTA botón dorado presente
  const ctaButton = await page.$('a[href*="tel"], a:has-text("Pedir Cita")');
  assert(ctaButton, '✗ FAIL: Botón CTA no encontrado');
  console.log('✓ CTA botón presente');

  // 5. WhatsApp flotante
  const whatsapp = await page.$('a[href*="wa.me"]');
  assert(whatsapp, '✗ FAIL: Enlace WhatsApp no encontrado');
  console.log('✓ WhatsApp enlace presente');

  // 6. Teléfono en footer
  const footer = await page.$('footer');
  const footerText = await footer.textContent();
  assert(footerText.includes('918 062 403') || footerText.includes('692 966 377'),
    '✗ FAIL: Teléfono no encontrado en footer');
  console.log('✓ Teléfono presente en footer');

  // 7. Dirección presente
  const pageText = await page.textContent('body');
  assert(pageText.includes('Tres Cantos'), '✗ FAIL: Mención a Tres Cantos no encontrada');
  console.log('✓ Localización Tres Cantos presente');

  // 8. Sección servicios
  const serviciosSection = await page.$('section:has(h2)');
  assert(serviciosSection, '✗ FAIL: No hay secciones de contenido');
  console.log('✓ Secciones de contenido presentes');

  // 9. Meta description presente y correcta longitud
  const metaDesc = await page.$eval('meta[name="description"]', el => el.content);
  assert(metaDesc && metaDesc.length >= 120 && metaDesc.length <= 160,
    '✗ FAIL: Meta description ausente o longitud incorrecta: ' + metaDesc?.length);
  console.log('✓ Meta description correcta (' + metaDesc.length + ' chars)');

  // 10. Schema.org presente
  const schema = await page.$('script[type="application/ld+json"]');
  assert(schema, '✗ FAIL: Schema.org no encontrado');
  console.log('✓ Schema.org presente');

  // 11. Responsive viewport meta
  const viewport = await page.$('meta[name="viewport"]');
  assert(viewport, '✗ FAIL: Meta viewport no encontrado');
  console.log('✓ Meta viewport presente');

  // 12. Google Fonts cargadas
  const fontLink = await page.$('link[href*="fonts.googleapis.com"]');
  assert(fontLink, '✗ FAIL: Google Fonts no enlazadas');
  console.log('✓ Google Fonts enlazadas');

  // 13. Footer con datos completos
  assert(footerText.includes('info@novanorte.com'), '✗ FAIL: Email no encontrado en footer');
  console.log('✓ Email presente en footer');

  // 14. Palomar Vectus mencionado
  assert(pageText.includes('Palomar') || pageText.includes('palomar'),
    '✗ FAIL: Palomar Vectus no mencionado');
  console.log('✓ Palomar Vectus mencionado');

  // 15. Testimonios presentes
  assert(pageText.includes('Nuria') || pageText.includes('Vanessa') || pageText.includes('Patricia'),
    '✗ FAIL: Testimonios no encontrados');
  console.log('✓ Testimonios presentes');

  await browser.close();
  console.log('\n✅ TODOS LOS TESTS PASADOS - Web NovaNorte lista!');
})().catch(err => {
  console.error('❌ ERROR EN TESTS:', err.message);
  process.exit(1);
});
