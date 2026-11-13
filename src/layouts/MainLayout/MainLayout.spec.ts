/* eslint vue/one-component-per-file: off */

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createI18n } from 'vue-i18n'
import { defineComponent, h, nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { messages } from '@/i18n'
import { useLocaleStore } from '@/stores/locale'
import { useThemeStore } from '@/stores/theme'
import MainLayout from './MainLayout.vue'

const ThemeSwitchStub = defineComponent({
  name: 'ElSwitch',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () =>
      h(
        'button',
        {
          'aria-label': 'Cambiar tema claro u oscuro',
          'data-theme': props.modelValue ? 'dark' : 'light',
          onClick: () => emit('update:modelValue', !props.modelValue)
        },
        'Cambiar tema'
      )
  }
})

const LocaleSelectorStub = defineComponent({
  name: 'ElRadioGroup',
  props: {
    modelValue: {
      type: String,
      default: 'es'
    }
  },
  emits: ['change'],
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        { 'data-locale': props.modelValue },
        slots.default?.()
      )
  }
})

const RadioButtonStub = defineComponent({
  name: 'ElRadioButton',
  setup() {
    return () => null
  }
})

function mountLayout() {
  const pinia = createPinia().use(piniaPluginPersistedstate)
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/contact', component: { template: '<div />' } }
    ]
  })
  const i18n = createI18n({
    legacy: false,
    locale: 'es',
    fallbackLocale: 'es',
    messages
  })
  const wrapper = mount(MainLayout, {
    global: {
      plugins: [pinia, router, i18n],
      components: {
        ElSwitch: ThemeSwitchStub,
        ElRadioGroup: LocaleSelectorStub,
        ElRadioButton: RadioButtonStub
      }
    },
    slots: {
      default: '<p>Contenido de la página</p>'
    }
  })

  return { wrapper, i18n }
}

describe('MainLayout', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  afterEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('renders navigation, page content, and the footer in Spanish', () => {
    const { wrapper } = mountLayout()

    expect(wrapper.text()).toContain('Inicio')
    expect(wrapper.text()).toContain('Contacto')
    expect(wrapper.text()).toContain('Contenido de la página')
    expect(wrapper.text()).toContain('© 2026 - Demo Vue con Pinia, i18n y Element Plus')
    expect(wrapper.find('a[href="/"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/contact"]').exists()).toBe(true)

    wrapper.unmount()
  })

  it('synchronizes locale selection with the store and translations', async () => {
    const { wrapper, i18n } = mountLayout()
    const localeStore = useLocaleStore()
    const selector = wrapper.findComponent(LocaleSelectorStub)

    expect(selector.props('modelValue')).toBe('es')

    selector.vm.$emit('change', 'en')
    await nextTick()

    expect(localeStore.currentLocale).toBe('en')
    expect(i18n.global.locale.value).toBe('en')
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Contact')

    selector.vm.$emit('change', 'fr')
    await nextTick()

    expect(localeStore.currentLocale).toBe('en')
    wrapper.unmount()
  })

  it('updates the theme store and document class through the theme switch', async () => {
    const { wrapper } = mountLayout()
    const themeStore = useThemeStore()
    const themeSwitch = wrapper.findComponent(ThemeSwitchStub)

    expect(themeStore.currentTheme).toBe('light')
    expect(document.documentElement.classList).not.toContain('dark')

    await themeSwitch.trigger('click')
    await nextTick()

    expect(themeStore.currentTheme).toBe('dark')
    expect(document.documentElement.classList).toContain('dark')

    await themeSwitch.trigger('click')
    await nextTick()

    expect(themeStore.currentTheme).toBe('light')
    expect(document.documentElement.classList).not.toContain('dark')
    wrapper.unmount()
  })
})
