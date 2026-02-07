# Barón Joyeros — Web (HTML/CSS/JS)

Web estática (sin frameworks) para **Barón Joyeros** (Alcobendas, Madrid). Incluye 5 páginas:

- `index.html` (Inicio)
- `servicios.html`
- `galeria.html`
- `sobre-nosotros.html`
- `contacto.html`

## Ejecutar

Opción rápida: abre `index.html` en el navegador.

Si lo sirves con MAMP/Apache, apunta la URL a la carpeta del proyecto y abre `index.html`.

## Formulario de contacto (100% estático)

El proyecto se mantiene **estrictamente en HTML/CSS/JS** (como pide el brief). Sin backend, un formulario no puede
enviar datos a un servidor. Por eso, al enviar en `contacto.html`:

- valida los campos
- **copia el mensaje**
- abre un **borrador de correo** (mailto) para enviarlo

Si más adelante quieres un envío “real” (email/CRM), se puede conectar a un endpoint (PHP, Node, Formspree, etc.).

## SEO

- Meta tags por página + `Schema.org` tipo `JewelryStore`
- `robots.txt`
- `sitemap.xml` (recuerda reemplazar `https://TU-DOMINIO-AQUI/` por tu dominio final)

