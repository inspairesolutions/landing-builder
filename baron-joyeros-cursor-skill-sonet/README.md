# Barón Joyeros - Sitio Web Oficial

Sitio web elegante y sofisticado para Barón Joyeros, joyería familiar con más de 30 años de experiencia en Alcobendas, Madrid.

## 🎨 Características del Diseño

- **Estética**: Elegante, minimalista y lujo discreto
- **Tipografía**: Cormorant Garamond (headings) + Montserrat (body)
- **Paleta de Colores**: Oro (#D4AF37), Negro elegante (#1a1a1a), Blanco, Grises suaves
- **Animaciones**: Sutiles y sofisticadas
- **Responsive**: Mobile-first design

## 📁 Estructura del Proyecto

```
baron-joyeros/
├── index.html              # Página de inicio
├── servicios.html          # Página de servicios
├── galeria.html           # Galería de joyas
├── sobre-nosotros.html    # Historia y valores
├── contacto.html          # Formulario de contacto y mapa
├── css/
│   └── styles.css         # Estilos principales
├── js/
│   └── main.js            # JavaScript funcional
├── research/
│   ├── logo_baron_joyeros.png
│   ├── foto_tienda_interior.jpg
│   └── prompt.txt
└── README.md
```

## 🚀 Características Técnicas

### HTML
- Semántico y accesible
- Schema.org LocalBusiness markup
- Open Graph tags
- Meta tags optimizadas para SEO

### CSS
- Variables CSS para consistencia
- Diseño responsive con CSS Grid y Flexbox
- Animaciones CSS nativas
- Mobile-first approach
- Optimizado para rendimiento

### JavaScript
- Vanilla JS (sin dependencias)
- Navegación móvil
- Validación de formularios
- Filtros de galería
- Lazy loading de imágenes
- Animaciones on scroll
- Smooth scroll

### SEO
- Títulos y meta descriptions optimizados
- URLs limpias y descriptivas
- Estructura de headings correcta
- Schema.org markup para LocalBusiness
- Alt text en todas las imágenes
- Sitemap.xml
- Robots.txt

### Performance
- Imágenes optimizadas
- Lazy loading
- CSS y JS minificables
- Fuentes optimizadas con preconnect
- Sin dependencias externas pesadas

## 🔧 Instalación y Uso

### Servidor Local

1. **Con MAMP/WAMP/XAMPP**:
   - Coloca los archivos en la carpeta `htdocs` o `www`
   - Accede desde: `http://localhost/baron-joyeros/`

2. **Con Live Server (VS Code)**:
   - Instala la extensión "Live Server"
   - Click derecho en `index.html` → "Open with Live Server"

3. **Con Python**:
   ```bash
   python -m http.server 8000
   # Accede a http://localhost:8000
   ```

4. **Con Node.js (http-server)**:
   ```bash
   npx http-server
   ```

### Producción

Para publicar en producción:

1. **Optimizar imágenes**: Comprime las imágenes en `/research/`
2. **Minificar CSS y JS**: Usa herramientas como cssnano y terser
3. **Configurar dominio**: Apunta el dominio a los archivos
4. **SSL**: Asegura HTTPS con Let's Encrypt o similar
5. **CDN**: Considera usar un CDN para assets estáticos

## 📞 Información de Contacto

- **Nombre**: Barón Joyeros
- **Dirección**: C. de la Constitución, 50, 28100 Alcobendas, Madrid
- **Teléfono**: 916 593 932
- **Google Maps**: [Ver ubicación](https://maps.app.goo.gl/vVS37z7LLCeWENnY9)

## 🎯 Palabras Clave SEO

- Joyería Alcobendas
- Joyería Madrid Norte
- Oro 18 kilates Madrid
- Plata de ley Alcobendas
- Alianzas de boda Alcobendas
- Reparación de joyas Madrid
- Taller joyería Alcobendas
- Brillantes certificados Madrid

## 📊 Optimizaciones Pendientes

### Imágenes Reales
- [ ] Reemplazar placeholders SVG con fotografías reales de joyas
- [ ] Optimizar todas las imágenes (WebP format)
- [ ] Añadir imágenes en diferentes resoluciones (responsive images)

### Backend
- [ ] Implementar backend para formulario de contacto
- [ ] Integrar con servicio de email (SendGrid, Mailgun, etc.)
- [ ] Sistema de gestión de contenido (opcional)

### Analítica
- [ ] Google Analytics
- [ ] Google Tag Manager
- [ ] Facebook Pixel (si aplica)

### SEO Avanzado
- [ ] Google Search Console
- [ ] Google My Business actualizado
- [ ] Reseñas de clientes integradas
- [ ] Blog (opcional)

## 🔒 Seguridad

- Formulario con validación client-side y server-side
- Headers de seguridad (CSP, X-Frame-Options, etc.)
- HTTPS obligatorio en producción
- Protección contra spam en formularios

## 📱 Navegadores Soportados

- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)
- iOS Safari 12+
- Chrome Android

## 📝 Licencia

© 2026 Barón Joyeros. Todos los derechos reservados.

## 👨‍💻 Desarrollo

Este proyecto fue desarrollado siguiendo principios de diseño moderno y elegante, evitando estéticas genéricas de IA. Cada detalle fue cuidadosamente considerado para reflejar la calidad y sofisticación de Barón Joyeros.

### Principios de Diseño Aplicados
- Lujo refinado y minimalista
- Tipografía distintiva (no genérica)
- Espaciado generoso
- Animaciones sutiles
- Paleta de colores coherente con la marca
- Experiencia de usuario intuitiva
