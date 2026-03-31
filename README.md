# xenny Frontend

Frontend de `xenny`, enfocado hoy en una landing de captacion para presentar la propuesta del producto y convertir interesados hacia WhatsApp. El repo tambien conserva una base tecnica de autenticacion, dashboard protegido y modulo de eventos, pero esa parte todavia esta en estado de scaffolding y no representa el flujo principal actual del proyecto.

## Objetivo actual del proyecto

La prioridad visible del producto es la experiencia publica:

- Mostrar la propuesta de valor de `xenny` como capa operativa con equipos de agentes AI.
- Validar mensajes de marketing mediante dos versiones de landing.
- Llevar los CTA de demo/contacto a WhatsApp con mensajes precargados segun el contexto.

La aplicacion no debe entenderse hoy como un SaaS completo ya cerrado, sino como una combinacion de:

- landing marketing activa,
- base tecnica reutilizable para auth/dashboard,
- experimentacion de producto y conversion.

## Rutas actuales

| Ruta | Estado | Descripcion |
| --- | --- | --- |
| `/` | activa | Landing principal actual (`HomeV2`). |
| `/version-2` | activa | Alias de la landing principal. |
| `/version-1` | activa | Landing anterior, conservada como alternativa. |
| `/login` | base tecnica | Formulario de login. |
| `/register` | base tecnica | Formulario de registro. |
| `/recover-password` | base tecnica | Solicitud de recuperacion de password. |
| `/reset-password/:token` | base tecnica | Pantalla de reset. |
| `/dashboard` | protegido | Dashboard placeholder con widget de eventos. |

## Estado actual

### Lo que si esta alineado con el objetivo actual

- Landing principal en `HomeV2`.
- Landing alternativa en `Home`.
- CTA conectados a WhatsApp.
- Router ya configurado para separar experiencia publica y experiencia autenticada.

### Lo que sigue en modo base / incompleto

- El dashboard sigue siendo un placeholder.
- El flujo de auth no esta listo como producto final.
- `src/lib/supabaseClient.ts` esta mockeado/deshabilitado.
- Hay inconsistencias de TypeScript en auth/http/events que impiden una build limpia del proyecto en su estado actual.

## Stack real del repo

- React 19
- TypeScript 5
- Vite 6
- React Router DOM 6
- Zustand
- React Query
- React Hook Form
- React Hot Toast
- Tailwind CSS 4
- CSS custom para las landings

Nota importante: aunque Tailwind esta instalado y se usa en auth/dashboard, las landings principales estan construidas mayormente con CSS propio.

## Estructura relevante

```text
src/
├── pages/
│   ├── HomeV2.tsx           # Landing principal actual
│   ├── Home.tsx             # Landing alternativa / version anterior
│   └── Dashboard.tsx        # Dashboard base protegido
├── modules/
│   ├── auth/                # Formularios, hooks, store y servicios de auth
│   └── events/              # Widget y hooks de eventos para el dashboard
├── core/
│   ├── routes/              # ProtectedRoute
│   ├── constants/
│   └── types/
├── lib/
│   ├── http/                # apiClient
│   ├── supabaseClient.ts    # Stub actual
│   └── whatsapp.ts          # Helper de CTAs a WhatsApp
└── test/                    # Setup de testing
```

## Desarrollo local

### Requisitos

- Node.js 20+
- npm 10+

### Instalar dependencias

```bash
npm install
```

### Ejecutar el proyecto

```bash
npm run dev
```

Vite levanta la app localmente, normalmente en `http://localhost:5173`.

## Variables de entorno

Hoy la variable realmente utilizada en el frontend es:

```ini
VITE_API_URL=http://localhost:3000/api
```

Observaciones:

- `apiClient` usa `VITE_API_URL` como base para requests HTTP.
- El cliente de Supabase actual esta deshabilitado en `src/lib/supabaseClient.ts`, por lo que las variables de Supabase no son el punto critico hoy para la landing.

## Scripts disponibles

| Script | Uso |
| --- | --- |
| `npm run dev` | Levanta Vite en desarrollo. |
| `npm run build` | Compila para produccion. |
| `npm run type-check` | Ejecuta chequeo de TypeScript sin emitir archivos. |
| `npm run lint` | Ejecuta ESLint. |
| `npm run test` | Corre Vitest. |
| `npm run preview` | Sirve la build localmente. |

## Recomendaciones para seguir el proyecto

Si el foco sigue siendo marketing y conversion:

- iterar `HomeV2` como landing principal,
- usar `Home` solo como referencia o experimento,
- mantener los CTAs conectados a WhatsApp y medir conversion.

Si el foco vuelve a ser producto autenticado:

- corregir los tipos rotos en auth/http/events,
- definir un proveedor real de autenticacion,
- alinear store, servicios y `apiClient`,
- convertir el dashboard en una experiencia real de producto.

## Nota sobre documentacion interna

El archivo `AGENT.md` sigue siendo la referencia de trabajo para agentes/automatizaciones dentro del repo, pero este `README.md` ahora describe el estado real del proyecto y su objetivo actual.
# www.xenny.xyz
# www.xenny.xyz
# www.xenny.xyz
