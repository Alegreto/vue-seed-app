import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 1. Importar Element Plus y su CSS
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import App from './App.vue'
import router from './router/index.ts'
import { i18n } from './i18n/index.ts'
import { useLocaleStore } from './stores/locale.ts'
import { useThemeStore } from './stores/theme.ts'

const app = createApp(App)

// 2. Configurar Pinia con plugin de persistencia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// 3. Sincronizar idioma y tema guardados
const localeStore = useLocaleStore()
i18n.global.locale.value = localeStore.currentLocale
useThemeStore() // <-- Ejecuta el watch({ immediate: true }) y aplica la clase .dark si estaba guardada

// 4. Registrar plugins
app.use(i18n)
app.use(router)

// 5. Montar la aplicación
app.mount('#app')