import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { describe, expect, it } from 'vitest'
import { messages } from '@/i18n'
import HomeView from './HomeView.vue'

function mountHomeView(locale: 'es' | 'en' = 'es') {
  const i18n = createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'es',
    messages
  })

  return mount(HomeView, {
    global: {
      plugins: [i18n],
      stubs: {
        ElButton: {
          template: '<button><slot /></button>'
        }
      }
    }
  })
}

describe('HomeView', () => {
  it('renders the home content and button in Spanish', () => {
    const wrapper = mountHomeView()

    expect(wrapper.get('h1').text()).toBe('Página Principal')
    expect(wrapper.get('p').text()).toBe('Esta es la vista de inicio dentro de MainLayout..')
    expect(wrapper.get('button').text()).toBe('Botón de Element Plus')

    wrapper.unmount()
  })

  it('renders the home content and button in English', () => {
    const wrapper = mountHomeView('en')

    expect(wrapper.get('h1').text()).toBe('Home Page')
    expect(wrapper.get('p').text()).toBe('This is the home view inside MainLayout..')
    expect(wrapper.get('button').text()).toBe('Element Plus Button')

    wrapper.unmount()
  })
})
