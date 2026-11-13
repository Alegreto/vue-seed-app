# Vue 3 + TypeScript Enterprise Starter Template

Plantilla base (*seed project*) modular, escalable y preconfigurada para iniciar aplicaciones web modernas con **Vue 3**, **TypeScript**, **Pinia**, **Element Plus**, **Vue I18n** y herramientas de análisis estático de alto rendimiento (**Oxlint + ESLint**).

---

## Stack Tecnológico

* **Core:** [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/)
* **Enrutamiento:** [Vue Router](https://router.vuejs.org/) con carga perezosa (*lazy loading*) de vistas
* **Gestión de Estado:** [Pinia](https://pinia.vuejs.org/) + `pinia-plugin-persistedstate` (persistencia automática en `localStorage`)
* **UI & Estilos:** [Element Plus](https://element-plus.org/) con importación bajo demanda (`unplugin-vue-components` + `unplugin-auto-import`), SASS/SCSS desacoplado y soporte nativo de **Modo Claro / Oscuro**
* **Internacionalización:** [Vue I18n](https://vue-i18n.intlify.dev/) (`legacy: false`) con diccionarios separados por idioma (`es` / `en`)
* **Testing:** [Vitest](https://vitest.dev/) + `@vue/test-utils` + `jsdom`
* **Calidad de Código y Linting:**
  * [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) (análisis ultrarrápido en Rust)
  * [ESLint](https://eslint.org/) (Flat Config) con reglas para Vue 3, TypeScript, Accesibilidad (`eslint-plugin-vuejs-accessibility`) y `eslint-plugin-oxlint`

---

## Estructura del Proyecto

```text
├── .vscode/                  # Configuración recomendada del editor (auto-fix ESLint al guardar)
├── src/
│   ├── i18n/
│   │   ├── locales/          # Diccionarios independientes por idioma
│   │   │   ├── en.ts
│   │   │   └── es.ts
│   │   └── index.ts          # Configuración e instancia global de vue-i18n
│   ├── layouts/
│   │   └── MainLayout/       # Layout principal con estilos SASS desacoplados
│   │       ├── MainLayout.scss
│   │       └── MainLayout.vue
│   ├── router/
│   │   └── index.ts          # Definición de rutas con lazy loading
│   ├── stores/               # Stores de Pinia (convención dominio.ts -> useDominioStore)
│   │   ├── locale.ts         # Estado y persistencia del idioma activo
│   │   └── theme.ts          # Estado, persistencia y sincronización DOM del tema light/dark
│   ├── views/                # Vistas principales de la aplicación
│   │   ├── ContactView.vue
│   │   └── HomeView.vue
│   ├── App.vue               # Componente raíz
│   ├── main.ts               # Punto de entrada e inicialización de plugins
│   ├── auto-imports.d.ts     # Tipos autogenerados por unplugin-auto-import
│   └── components.d.ts       # Tipos autogenerados de componentes Element Plus
├── .oxlintrc.json            # Configuración de reglas y plugins para Oxlint
├── eslint.config.js          # Configuración Flat Config de ESLint
├── package.json              # Dependencias, scripts y overrides de seguridad
├── tsconfig.app.json         # Configuración estricta de TypeScript con alias @/*
└── vite.config.ts            # Configuración de Vite y resolvers bajo demanda