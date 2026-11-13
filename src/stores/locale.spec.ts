import { createApp, nextTick } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { useLocaleStore } from './locale'

function createLocaleStore() {
  const pinia = createPinia().use(piniaPluginPersistedstate)
  createApp({}).use(pinia)
  setActivePinia(pinia)

  return useLocaleStore()
}

describe('useLocaleStore', () => {
  beforeEach(() => {
    localStorage.clear()
    createLocaleStore()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('starts with Spanish as the current locale', () => {
    expect(useLocaleStore().currentLocale).toBe('es')
  })

  it('changes the current locale', () => {
    const store = useLocaleStore()

    store.setLocale('en')
    expect(store.currentLocale).toBe('en')

    store.setLocale('es')
    expect(store.currentLocale).toBe('es')
  })

  it('persists and restores the selected locale', async () => {
    createLocaleStore().setLocale('en')
    await nextTick()

    const restoredStore = createLocaleStore()

    expect(restoredStore.currentLocale).toBe('en')
  })
})
