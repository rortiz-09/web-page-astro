# Reitcom ISP - Plataforma Web

Plataforma web moderna para Reitcom ISP, construida con Astro, Preact y TailwindCSS.

## 🚀 Tecnologías

- **Framework:** [Astro](https://astro.build)
- **UI Library:** [Preact](https://preactjs.com)
- **Styling:** [TailwindCSS](https://tailwindcss.com)
- **Icons:** Heroicons / SVG
- **Fonts:** Montserrat & Inter (via Fontsource)

## 📂 Estructura del Proyecto

```
src/
├── components/         # Componentes UI reutilizables
│   ├── client/         # Componentes específicos del cliente
│   ├── layouts/        # Layouts generales (DashboardLayout)
│   └── modules/        # Módulos de Dashboard por rol
├── data/               # Datos estáticos y Mock DB (users.json)
├── layouts/            # Layouts de página (Astro)
├── pages/              # Rutas de la aplicación (File-based routing)
│   ├── api/            # Endpoints de API (Auth)
│   ├── colaboradores/  # Portales internos (Admin, Tech, etc.)
│   └── error/          # Páginas de error (404, 403)
└── utils/              # Utilidades (cookies, formatters)
```

## 🔐 Usuarios de Prueba (Seeding)

El sistema incluye un script de seeding para generar usuarios por defecto.
Contraseña por defecto para todos: `Reitcom2025!`

| Rol | Usuario / Email | Código / ID | Portal |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@reitcom.net` | `RC25A001` | `/colaboradores/administradores` |
| **Financiero** | `finanzas@reitcom.net` | `RC25F001` | `/colaboradores/financiero` |
| **Técnico** | `tecnico@reitcom.net` | `RC25T001` | `/colaboradores/tecnicos` |
| **RRHH** | `rrhh@reitcom.net` | `RC25H001` | `/colaboradores/recursoshumanos` |
| **Fiscal** | `legal@reitcom.net` | `RC25L001` | `/colaboradores/fiscalizadores` |
| **Cliente** | `cliente@gmail.com` | `0999999999` | `/mi-cuenta` |

## 🛠️ Comandos

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

### Seeding (Resetear Usuarios)

```bash
npx tsx scripts/seed-initial-users.ts
```

### Producción (Build)

```bash
npm run build
```

## 🐳 Docker Deployment

El proyecto incluye un `Dockerfile` optimizado (Multistage Build).

```bash
# Construir imagen
docker build -t reitcom-web .

# Correr contenedor
docker run -p 8080:80 reitcom-web
```
