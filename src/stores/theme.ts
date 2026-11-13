import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type ThemeMode = 'light' | 'dark'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const currentTheme = ref<ThemeMode>('light')

    function applyThemeToDOM(theme: ThemeMode) {
      const htmlEl = document.documentElement
      if (theme === 'dark') {
        htmlEl.classList.add('dark')
      } else {
        htmlEl.classList.remove('dark')
      }
    }

    function setTheme(newTheme: ThemeMode) {
      currentTheme.value = newTheme
    }

    function toggleTheme() {
      currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
    }

    // Reacciona automáticamente a cualquier cambio (incluida la hidratación al recargar)
    watch(
      currentTheme,
      (newTheme) => {
        applyThemeToDOM(newTheme)
      },
      { immediate: true }
    )

    return {
      currentTheme,
      setTheme,
      toggleTheme
    }
  },
  {
    persist: true // Guarda en localStorage bajo la clave 'theme'
  }
)