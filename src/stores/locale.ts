import { defineStore } from 'pinia'
import { ref } from 'vue'

export type AvailableLocale = 'es' | 'en'

export const useLocaleStore = defineStore(
  'locale',
  () => {
    // Estado: idioma actual, por defecto español
    const currentLocale = ref<AvailableLocale>('es')

    // Acción para cambiar el idioma
    function setLocale(newLocale: AvailableLocale) {
      currentLocale.value = newLocale
    }

    return {
      currentLocale,
      setLocale
    }
  },
  {
    // Activa la persistencia automática en localStorage con la clave 'locale'
    persist: true
  }
)