import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { describe, expect, it } from 'vitest'
import { messages } from '@/i18n'
import ContactView from './ContactView.vue'

function mountContactView(locale: 'es' | 'en' = 'es') {
  const i18n = createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'es',
    messages
  })

  return mount(ContactView, {
    global: {
      plugins: [i18n]
    }
  })
}

describe('ContactView', () => {
  it('renders the contact content in Spanish', () => {
    const wrapper = mountContactView()

    expect(wrapper.get('h1').text()).toBe('Contacto')
    expect(wrapper.get('p').text()).toBe('Envía un mensaje o consulta a través de este formulario.')

    wrapper.unmount()
  })

  it('renders the contact content in English', () => {
    const wrapper = mountContactView('en')

    expect(wrapper.get('h1').text()).toBe('Contact')
    expect(wrapper.get('p').text()).toBe('Send a message or query through this form.')

    wrapper.unmount()
  })
})
