# Clínica Estética NovaNorte — Rediseño Web

Renovación completa de la web de Clínica Estética NovaNorte (Tres Cantos, Madrid). Mantiene la identidad corporativa (azul marino + dorado) con un diseño moderno, responsivo y optimizado para SEO local.

## Tecnologías

- **HTML5** semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- **CSS3** con variables custom, Flexbox, Grid, Media Queries
- **JavaScript** vanilla (ES5+ compatible) — sin dependencias externas
- **Lucide Icons** (CDN) — iconos outline cohesivos
- **Google Fonts** — Cormorant Garamond + Inter

## Estructura de archivos

```
novanorte/
├── index.html          # Página principal con HTML semántico
├── styles.css          # Estilos completos con responsive
├── scripts.js          # Interactividad (header, menús, animaciones)
├── test_novanorte.js   # Tests Playwright de validación
├── README.md           # Este archivo
├── images/
│   └── logos/
│       └── favicon.svg # Favicon del proyecto
└── research/
    └── prompt.txt      # Brief de diseño original
```

## Funcionalidades

- Header sticky con efecto shrink al scroll
- Mega-menú dropdown para tratamientos
- Menú hamburger responsive para móvil
- Animaciones de scroll con IntersectionObserver
- Contadores animados en sección de estadísticas
- Slider de testimonios con autoplay en móvil
- Botón flotante de WhatsApp con pulso animado
- Formulario de contacto con validación
- Smooth scroll para anclas internas
- Schema.org JSON-LD (MedicalClinic + LocalBusiness)
- Open Graph y Twitter Card meta tags
- Accesibilidad WCAG 2.1 AA (contraste, focus, ARIA, skip link)

## SEO

- Title optimizado (54 caracteres)
- Meta description (148 caracteres)
- Schema.org JSON-LD con datos estructurados
- Keywords de SEO local para Tres Cantos
- Canonical URL, hreflang, Open Graph

## Responsive

| Breakpoint | Dispositivo |
|------------|-------------|
| < 375px    | iPhone SE   |
| < 768px    | Mobile      |
| 768-1199px | Tablet      |
| > 1200px   | Desktop     |

## Ejecutar los tests

```bash
# Instalar Playwright (si no está instalado)
npm init -y
npm install playwright

# Ejecutar tests
node test_novanorte.js
```

## Créditos

- **Imágenes**: Propiedad de Clínica Estética NovaNorte (novanorte.com)
- **Iconos**: [Lucide Icons](https://lucide.dev/) (MIT License)
- **Tipografías**: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) + [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts, OFL)
- **Diseño**: Inspaire
