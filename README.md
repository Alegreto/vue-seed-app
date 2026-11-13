# Vue 3 + TypeScript Enterprise Starter Template

Plantilla base (*seed project*) modular, escalable y preconfigurada para iniciar aplicaciones web modernas con **Vue 3**, **TypeScript**, **Pinia**, **Element Plus**, **Vue I18n**, **Vitest** y herramientas de análisis estático de alto rendimiento (**Oxlint + ESLint**).

---

## Tabla de Contenidos

1. [Stack Tecnológico](#stack-tecnológico)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Arquitectura y Características Incluidas](#arquitectura-y-características-incluidas)
4. [Instalación y Puesta en Marcha](#instalación-y-puesta-en-marcha)
5. [Configuración de Entorno y Servicios](#configuración-de-entorno-y-servicios)
6. [Scripts Disponibles](#scripts-disponibles)
7. [Testing y Cobertura de Código](#testing-y-cobertura-de-código)
8. [Calidad de Código y Linting](#calidad-de-código-y-linting)
9. [Cómo Extender esta Plantilla](#cómo-extender-esta-plantilla)
10. [Licencia](#licencia)

---

## Stack Tecnológico

* **Core:** [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/)
* **Enrutamiento:** [Vue Router](https://router.vuejs.org/) con carga perezosa (*lazy loading*) de vistas
* **Gestión de Estado:** [Pinia](https://pinia.vuejs.org/) + `pinia-plugin-persistedstate` (persistencia automática en `localStorage`)
* **UI & Estilos:** [Element Plus](https://element-plus.org/) con importación bajo demanda (`unplugin-vue-components` + `unplugin-auto-import`), SASS/SCSS desacoplado y soporte nativo de **Modo Claro / Oscuro**
* **Internacionalización:** [Vue I18n](https://vue-i18n.intlify.dev/) (`legacy: false`) con diccionarios separados por idioma (`es` / `en`)
* **Testing & Cobertura:** [Vitest](https://vitest.dev/) + `@vue/test-utils` + `jsdom` + `@vitest/coverage-v8`
* **Calidad de Código y Linting:**
  * [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) (análisis ultrarrápido escrito en Rust)
  * [ESLint](https://eslint.org/) (Flat Config) con reglas para Vue 3, TypeScript, Accesibilidad (`eslint-plugin-vuejs-accessibility`) y `eslint-plugin-oxlint`

---

## Estructura del Proyecto

```text
├── .vscode/                  # Configuración recomendada del editor (auto-fix ESLint al guardar)
│   ├── extensions.json       # Extensiones sugeridas (Vue Official, ESLint)
│   └── settings.json         # Reglas de formato y guardado automático
├── .env.example              # Plantilla de variables públicas de entorno
├── src/
│   ├── i18n/
│   │   ├── locales/          # Diccionarios independientes por idioma
│   │   │   ├── en.ts         # Traducciones en inglés
│   │   │   └── es.ts         # Traducciones en español
│   │   └── index.ts          # Configuración e instancia global de vue-i18n
│   ├── layouts/
│   │   └── MainLayout/       # Layout principal con estilos SASS desacoplados
│   │       ├── MainLayout.scss
│   │       ├── MainLayout.vue
│   │       └── MainLayout.spec.ts
│   ├── router/
│   │   ├── index.ts          # Definición de rutas con lazy loading
│   │   └── index.spec.ts     # Tests unitarios de rutas y navegación
│   ├── stores/               # Stores de Pinia (convención dominio.ts -> useDominioStore)
│   │   ├── locale.ts         # Estado y persistencia del idioma activo
│   │   ├── locale.spec.ts    # Tests unitarios del store de idioma
│   │   ├── theme.ts          # Estado, persistencia y sincronización DOM del tema light/dark
│   │   └── theme.spec.ts     # Tests unitarios del store de tema
│   ├── views/                # Vistas principales de la aplicación
│   │   ├── ContactView.vue
│   │   ├── ContactView.spec.ts
│   │   ├── HomeView.vue
│   │   └── HomeView.spec.ts
│   ├── App.vue               # Componente raíz
│   ├── App.spec.ts           # Test co-ubicado del componente raíz
│   ├── main.ts               # Punto de entrada e inicialización de plugins
│   ├── env.d.ts              # Tipos de variables de entorno de Vite
│   ├── auto-imports.d.ts     # Tipos autogenerados por unplugin-auto-import
│   └── components.d.ts       # Tipos autogenerados de componentes Element Plus
├── .gitignore                # Exclusiones configuradas (node_modules, dist, coverage, .env)
├── .oxlintrc.json            # Configuración de reglas y plugins para Oxlint
├── eslint.config.js          # Configuración Flat Config de ESLint
├── LICENSE                   # Licencia MIT
├── package.json              # Dependencias, scripts y overrides de seguridad
├── tsconfig.json             # Referencias raíz de TypeScript
├── tsconfig.app.json         # Configuración estricta de TypeScript (excluye src/**/*.spec.ts)
├── tsconfig.node.json        # Configuración de TypeScript para archivos de entorno Node/Vite
├── vite.config.ts            # Configuración de Vite y resolvers bajo demanda
└── vitest.config.ts          # Configuración de Vitest, entorno jsdom y cobertura V8
```

---

## Arquitectura y Características Incluidas

1. **Gestión Persistente de Idioma (`src/stores/locale.ts` + `src/i18n/`):**
   * Diccionarios desacoplados por archivo (`es.ts` y `en.ts`) usando Vue I18n Composition API (`legacy: false`).
   * El store `useLocaleStore` sincroniza la selección del usuario (`es` / `en`) entre el selector de la cabecera, `vue-i18n` y `localStorage`.
   * `MainLayout` mantiene sincronizado el atributo `lang` del documento con el idioma activo para que los navegadores y tecnologías de asistencia identifiquen correctamente el idioma de la página.
   * Al recargar la página, `src/main.ts` hidrata el idioma guardado antes de montar la aplicación.
2. **Modo Claro y Oscuro Nativo (`src/stores/theme.ts` + `MainLayout`):**
   * El store `useThemeStore` alterna dinámicamente la clase `.dark` en `document.documentElement` y persiste la preferencia en `localStorage`.
   * Carga de `element-plus/theme-chalk/dark/css-vars.css` junto con variables CSS dinámicas (`--el-bg-color`, `--el-text-color-primary`, `--el-border-color`) en `MainLayout.scss` para adaptar automáticamente toda la página, cabecera, vistas hijas y pie de página.
3. **Importación Bajo Demanda (*Tree-Shaking*):**
   * Configurado mediante `unplugin-vue-components` y `unplugin-auto-import` con `ElementPlusResolver()` en `vite.config.ts`.
   * Los componentes de Element Plus (`<el-button>`, `<el-switch>`, `<el-radio-group>`, etc.) y sus estilos CSS se resuelven automáticamente al compilar, evitando empaquetar toda la librería en el bundle inicial y generando los tipos en `src/auto-imports.d.ts` y `src/components.d.ts`.
4. **Enrutamiento con Carga Perezosa (`src/router/index.ts`):**
   * Las rutas utilizan importaciones dinámicas (`() => import('@/views/...')`) para dividir cada vista en un *chunk* independiente en producción.
5. **Seguridad y Mantenimiento de Dependencias (`package.json`):**
   * Incluye bloque `overrides` para forzar versiones parcheadas de dependencias transitivas (`minimatch`, `glob`), manteniendo `npm audit` en **0 vulnerabilidades**.

---

## Instalación y Puesta en Marcha

### 1. Requisitos previos
* **Node.js:** `^22.22.2` o `>= 24.15.0` (coincide con `package.json`; `.nvmrc` fija `22.22.2`)
* **npm:** `>= 10.x`
* **Editor recomendado:** Visual Studio Code con las extensiones **Vue - Official (`Vue.volar`)** y **ESLint (`dbaeumer.vscode-eslint`)**. Al abrir el proyecto, VS Code sugerirá instalar las extensiones definidas en `.vscode/extensions.json`.

### 2. Crear un proyecto desde esta plantilla
* **Desde GitHub (Recomendado):** Haz clic en el botón verde **"Use this template" → "Create a new repository"** en la página principal de este repositorio para generar un proyecto nuevo con historial limpio.
* **Por terminal (Clonado directo):**
  ```bash
  git clone https://github.com/Alegreto/vue-seed-app.git nombre-nuevo-proyecto
  cd nombre-nuevo-proyecto
  ```

### 3. Instalar dependencias
Instala las dependencias exactamente según `package-lock.json` (incluye los `overrides` de seguridad aplicados):
```bash
npm ci
```

### 4. Personalización inicial del nuevo proyecto
Antes de empezar a desarrollar funcionalidades nuevas:
1. Actualiza los campos `"name"`, `"description"` y `"version"` en `package.json`.
2. Si vas a configurar una API, crea `.env.local` a partir de la plantilla y define `VITE_API_URL`:
   ```bash
   cp .env.example .env.local
   ```
   `.env.local` está ignorado por Git.
3. Arranca el entorno de desarrollo:
   ```bash
   npm run dev
   ```

---

## Configuración de Entorno y Servicios

* `.env.example` es la plantilla versionada de configuración; copia ese archivo a `.env.local` para los valores específicos del entorno local.
* Las variables disponibles en el código cliente deben llevar el prefijo `VITE_`. `VITE_API_URL` está tipada como opcional en `env.d.ts` porque esta semilla no necesita una API para arrancar. Si una funcionalidad depende de ella, debe comprobar que está configurada y mostrar o propagar un error explícito; no debe sustituirla silenciosamente por una URL inventada.
* **No guardes secretos en variables `VITE_*`**: Vite las expone en el bundle enviado al navegador. Tokens privados, claves secretas y credenciales deben residir en un backend.
* Al añadir una API, agrupa el código por funcionalidad (por ejemplo, `src/features/<funcionalidad>/api/`) y deja en `src/shared/api/` solo el transporte realmente común. Define los tipos de respuesta y errores cerca de la funcionalidad que los consume.
* Los clientes de API deben tratar por separado respuestas HTTP fallidas y errores de red, y conservar información suficiente para que la interfaz comunique el problema. Los componentes o composables deben representar explícitamente los estados de carga, éxito y error, sin convertir fallos en datos vacíos aparentemente válidos.

---

## Scripts Disponibles

Todos los comandos se ejecutan desde la raíz del proyecto mediante `npm run <script>`:

### Desarrollo y Compilación
| Comando | Qué ejecuta por debajo | Descripción |
| :--- | :--- | :--- |
| `npm run dev` | `vite` | Levanta el servidor de desarrollo local con recarga instantánea (HMR) y genera/actualiza los tipos automáticos `src/auto-imports.d.ts` y `src/components.d.ts`. |
| `npm run build` | `run-p type-check "build-only {@}" --` | Ejecuta en paralelo la validación completa de tipos de TypeScript y la compilación minificada para producción en la carpeta `dist/`. |
| `npm run build-only` | `vite build` | Empaqueta los archivos estáticos en `dist/` sin ejecutar previamente `vue-tsc` (útil si ya validaste tipos en un paso previo de CI). |
| `npm run preview` | `vite preview` | Sirve localmente la carpeta `dist/` compilada para verificar el rendimiento y comportamiento de producción antes de desplegar. |

### Calidad de Código y Tipado
| Comando | Qué ejecuta por debajo | Descripción |
| :--- | :--- | :--- |
| `npm run type-check` | `vue-tsc --build` | Comprueba el tipado estático de TypeScript en archivos `.ts` y bloques `<script setup lang="ts">` de componentes `.vue`. |
| `npm run lint` | `oxlint && eslint . --ignore-pattern 'coverage/**'` | Ejecuta **Oxlint** y **ESLint** para informar de problemas sin modificar archivos. |
| `npm run lint:fix` | `oxlint && eslint . --fix --ignore-pattern 'coverage/**'` | Ejecuta Oxlint y aplica las correcciones automáticas disponibles de ESLint. Revisa los cambios antes de confirmarlos. |

### Testing y Cobertura
| Comando | Qué ejecuta por debajo | Descripción |
| :--- | :--- | :--- |
| `npm run test:unit` | `vitest --run` | Ejecuta todos los tests (`*.spec.ts`) una única vez y devuelve el código de salida (ideal para pipelines CI/CD o validación previa a un `git push`). |
| `npm run test:watch` | `vitest` | Inicia Vitest en modo interactivo (*watch*), re-ejecutando automáticamente solo los tests afectados cada vez que guardas un archivo. |
| `npm run test:coverage` | `vitest run --coverage` | Ejecuta la suite completa, verifica los umbrales de cobertura y genera el informe web interactivo en `coverage/index.html`. |

### Flujo de Verificación Recomendado (Pre-Commit / CI)
Antes de subir cambios importantes o crear una *release*, encadena la validación completa:
```bash
npm run type-check && npm run lint && npm run test:unit && npm run build
```

---

## Testing y Cobertura de Código

* **Convención de ubicación (*Co-located*):** Todos los módulos principales cuentan con su archivo de prueba (`*.spec.ts`) ubicado en el mismo directorio que el archivo fuente que validan:
  * **Stores:** `src/stores/locale.spec.ts` y `src/stores/theme.spec.ts`
  * **Enrutador:** `src/router/index.spec.ts`
  * **Layouts y Vistas:** `src/layouts/MainLayout/MainLayout.spec.ts`, `src/views/HomeView.spec.ts`, `src/views/ContactView.spec.ts` y `src/App.spec.ts`
* **Aislamiento de tipos y entorno:** `tsconfig.app.json` excluye `"src/**/*.spec.ts"` del chequeo de tipos de la aplicación. Los tests importan sus APIs desde `vitest` y `vitest.config.ts` configura `jsdom`.
* **Umbrales mínimos:** Vitest requiere al menos 80 % en líneas, statements, funciones y ramas. CI ejecuta `npm run test:coverage`, por lo que un descenso bajo cualquiera de estos umbrales hace fallar el workflow.
* **Reportes visuales:** Al ejecutar `npm run test:coverage`, se crea la carpeta `coverage/` (excluida en `.gitignore`). Abre `coverage/index.html` en tu navegador para inspeccionar línea por línea el código cubierto y no cubierto.
* **Pruebas E2E:** Son una capa opcional para verificar flujos completos en un navegador real. Añádelas cuando el proyecto derivado tenga flujos de usuario importantes y estables; mantenlas en un workflow independiente del CI de unit tests para que no sean un requisito universal de esta semilla.

---

## Calidad de Código y Linting

El proyecto utiliza una estrategia híbrida de dos fases para maximizar velocidad y cobertura de reglas:

1. **Oxlint (`.oxlintrc.json`):** Ejecuta en milisegundos las reglas generales de JavaScript, TypeScript, Vue y Vitest.
2. **ESLint (`eslint.config.js`):** Desactiva las reglas ya cubiertas por Oxlint mediante `eslint-plugin-oxlint` y aplica reglas avanzadas específicas de Vue 3 y **accesibilidad web (`eslint-plugin-vuejs-accessibility`)**. `npm run lint` solo informa de problemas; usa `npm run lint:fix` para aplicar las correcciones automáticas disponibles.

---

## Cómo Extender esta Plantilla

* **Añadir una nueva vista:** Crea el componente en `src/views/` (junto con su `NuevaVista.spec.ts`) y regístralo mediante importación dinámica (`() => import('@/views/NuevaVista.vue')`) en `src/router/index.ts`.
* **Añadir un nuevo idioma:**
  1. Crea el diccionario en `src/i18n/locales/<codigo>.ts` respetando la misma estructura de claves que `es.ts` y `en.ts`.
  2. Regístralo en `messages` dentro de `src/i18n/index.ts`.
  3. Añade el código de idioma al tipo `AvailableLocale` en `src/stores/locale.ts` y al selector de `MainLayout.vue`.
* **Añadir un nuevo store:** Crea `src/stores/<nombre>.ts` exportando `use<Nombre>Store`, añade `{ persist: true }` como tercer argumento de `defineStore` si requiere persistencia en `localStorage`, y acompaña el módulo con `src/stores/<nombre>.spec.ts`.

---

## Licencia

Distribuido bajo la licencia **MIT**. Consulta el archivo [`LICENSE`](./LICENSE) para más información.