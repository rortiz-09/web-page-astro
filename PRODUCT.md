# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Hogares y pymes en Ecuador, con el mismo peso: personas que evalúan contratar internet por fibra óptica para su casa o su negocio. Llegan a comparar planes, verificar si hay cobertura en su zona y contactar para contratar.

## Product Purpose

Sitio público de Reitcom, proveedor de internet por fibra óptica. Su trabajo es convertir visitas en solicitudes de servicio: mostrar los planes de hogar y pyme, confirmar cobertura y facilitar el contacto. Éxito = el visitante entiende qué plan le sirve y deja sus datos o contacta.

## Positioning

Por definir. El sitio hoy afirma "la red de fibra #1 en Ecuador"; esa afirmación no está respaldada y no debe repetirse ni ampliarse hasta que Reitcom la confirme.

## Operating Context

- Rutas: inicio, nosotros, planes hogar, planes pyme, cobertura (mapa Leaflet), contacto, privacidad, términos.
- Contenido en español (Ecuador). Sede declarada en el SEO: Quito.
- Proporción móvil/escritorio de las visitas: sin datos todavía.

## Capabilities and Constraints

- Sitio estático (Astro SSG) con islas React; sin backend, cuentas ni portal de clientes.
- Los formularios de cobertura y contacto no tienen todavía un destino confirmado.
- Dominio provisional: `reitcom.ec`.

## Brand Commitments

- Nombre: Reitcom. Logo en `src/components/Logo.astro` y `public/favicon.svg`.

## Evidence on Hand

- **Precios de planes (hogar $25/$35/$50; pyme $45/$80) y testimonios son de muestra.** No presentarlos como reales ni inventar más: cualquier precio, testimonio, cifra de clientes o ranking debe venir confirmado por Reitcom.
- Imágenes en `public/` (hogar, velocidad, seguridad, fondo) y un video de 16 MB (`video.webm`).

## Product Principles

1. Hogar y pyme reciben el mismo cuidado; ninguno es un anexo del otro.
2. Claridad antes que espectáculo: el visitante debe poder elegir plan y saber si tiene cobertura en pocos pasos.
3. No afirmar nada que Reitcom no pueda respaldar.
4. Funciona igual de bien en móvil que en escritorio (las pruebas Playwright cubren ambos).
