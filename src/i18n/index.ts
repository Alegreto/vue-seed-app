import { createI18n } from 'vue-i18n'
import es from './locales/es'
import en from './locales/en'

export const messages = {
  es,
  en
}

export const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages
})