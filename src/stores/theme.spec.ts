import { createApp, nextTick } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { useThemeStore } from './theme'

function createThemeStore() {
  const pinia = createPinia().use(piniaPluginPersistedstate)
  createApp({}).use(pinia)
  setActivePinia(pinia)

  return useThemeStore()
}

describe('useThemeStore', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    createThemeStore()
  })

  afterEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('starts in light mode and removes the dark class', () => {
    document.documentElement.classList.add('dark')

    const store = createThemeStore()

    expect(store.currentTheme).toBe('light')
    expect(document.documentElement.classList).not.toContain('dark')
  })

  it('applies the selected theme to the document', async () => {
    const store = useThemeStore()

    store.setTheme('dark')
    await nextTick()
    expect(store.currentTheme).toBe('dark')
    expect(document.documentElement.classList).toContain('dark')

    store.setTheme('light')
    await nextTick()
    expect(store.currentTheme).toBe('light')
    expect(document.documentElement.classList).not.toContain('dark')
  })

  it('toggles between light and dark modes', async () => {
    const store = useThemeStore()

    store.toggleTheme()
    await nextTick()
    expect(store.currentTheme).toBe('dark')
    expect(document.documentElement.classList).toContain('dark')

    store.toggleTheme()
    await nextTick()
    expect(store.currentTheme).toBe('light')
    expect(document.documentElement.classList).not.toContain('dark')
  })

  it('persists and restores the selected theme', async () => {
    createThemeStore().setTheme('dark')
    await nextTick()

    const restoredStore = createThemeStore()
    await nextTick()

    expect(restoredStore.currentTheme).toBe('dark')
    expect(document.documentElement.classList).toContain('dark')
  })
})
