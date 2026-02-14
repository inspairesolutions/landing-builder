# Hygge Studio - Sitio Web

Sitio web para **Hygge Studio**, estudio de belleza multidisciplinar en Tres Cantos, Madrid.

## Estructura del Proyecto

```
hygge-studio/
├── index.html              # Página principal
├── favicon.svg             # Favicon (H en terracota)
├── README.md
├── css/
│   ├── variables.css       # Custom Properties (colores, tipografía, espaciado)
│   ├── reset.css           # Normalización cross-browser
│   ├── base.css            # Tipografía global, headings, body
│   ├── components.css      # Botones, cards, formularios, tabs, lightbox
│   ├── layout.css          # Grid, secciones, header, footer
│   ├── animations.css      # Fade-in scroll, keyframes
│   └── responsive.css      # Media queries: mobile → tablet → desktop
├── js/
│   ├── navigation.js       # Hamburger menu, smooth scroll, sticky header
│   ├── portfolio-filter.js # Filtrado por categorías
│   ├── lightbox.js         # Modal galería con teclado y swipe
│   ├── scroll-animations.js# Intersection Observer para fade-in
│   ├── whatsapp.js         # Tooltip botón flotante
│   └── form-validation.js  # Validación client-side
└── images/
    ├── hero.jpg            # Imagen principal del hero
    ├── espacio/            # 5 fotos del estudio
    └── portfolio/          # Fotos de trabajos (manicura, tatuajes, pestañas)
```

## Despliegue

Sitio estático HTML/CSS/JS. Opciones de despliegue:

1. **Servidor web estático** (Apache/Nginx): copiar todos los archivos
2. **Netlify/Vercel**: conectar repositorio o arrastrar carpeta
3. **MAMP local**: copiar a `htdocs` y acceder via `localhost`

## Guía de Actualización

### Actualizar Portfolio

1. Añadir nueva imagen en `images/portfolio/`
2. En `index.html`, dentro de `<div class="portfolio-grid">`, copiar un bloque `portfolio-grid__item` existente
3. Cambiar `data-category` al tipo correspondiente: `manicura`, `tatuajes`, `pestanas`, o `espacio`
4. Actualizar `src` y `alt` de la imagen

### Actualizar Precios y Servicios

Editar las cards de servicio en la sección `#servicios` del `index.html`. Cada card tiene:
- `.service-card__title` → nombre del servicio
- `.service-card__description` → descripción
- `.service-card__price` → precio "Desde X€"

### Cambiar Número WhatsApp

Buscar y reemplazar `34600000000` en todo el proyecto por el número real (formato internacional sin +).

### Actualizar Enlace Booksy

Buscar y reemplazar la URL de Booksy:
```
https://booksy.com/es-es/127123_hygge-studio_salon-de-unas_53150_soto-de-vinuelas
```

### Cambiar Horarios

Editar en dos lugares:
1. Sección contacto: buscar "Lun - Sáb: 10:00 - 20:00"
2. Schema.org JSON-LD en `<head>`: buscar `openingHoursSpecification`

### Variables CSS para Personalización Rápida

Editar `css/variables.css` para cambios globales:

| Variable | Uso | Valor |
|---|---|---|
| `--color-terracotta` | Color acento principal (CTAs) | `#E8C4BC` |
| `--color-terracotta-dark` | Hover del acento | `#D4A89A` |
| `--color-off-white` | Fondo principal | `#F5F5F5` |
| `--color-beige` | Fondo testimonios | `#F0E6DC` |
| `--font-heading` | Tipografía headings | `'DM Sans'` |
| `--font-body` | Tipografía cuerpo | `'Inter'` |
| `--section-padding` | Espaciado secciones desktop | `7.5rem` |

## Tecnologías

- HTML5 semántico
- CSS3 con Custom Properties (sin preprocesador)
- JavaScript vanilla (sin dependencias)
- Google Fonts: DM Sans + Inter
- Schema.org JSON-LD para SEO local
- FormSubmit.co para formulario de contacto
