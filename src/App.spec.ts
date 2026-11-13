import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import App from './App.vue'

describe('App', () => {
  it('mounts the main layout and router view', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          MainLayout: {
            template: '<div data-testid="main-layout"><slot /></div>'
          },
          RouterView: {
            template: '<div data-testid="router-view" />'
          }
        }
      }
    })

    expect(wrapper.find('[data-testid="main-layout"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="router-view"]').exists()).toBe(true)

    wrapper.unmount()
  })
})
