import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/views/HomeView.vue', () => ({
  default: { name: 'HomeView' }
}))

vi.mock('@/views/ContactView.vue', () => ({
  default: { name: 'ContactView' }
}))

import router from './index'

describe('router', () => {
  afterEach(async () => {
    await router.push('/')
  })

  it('registers the home and contact routes', () => {
    expect(router.getRoutes().map(({ path, name }) => ({ path, name }))).toEqual([
      { path: '/', name: 'home' },
      { path: '/contact', name: 'contact' }
    ])
  })

  it('navigates to the home route', async () => {
    await router.push('/')

    expect(router.currentRoute.value.name).toBe('home')
    expect(router.currentRoute.value.matched[0]?.components?.default).toBeDefined()
  })

  it('navigates to the contact route', async () => {
    await router.push('/contact')

    expect(router.currentRoute.value.name).toBe('contact')
    expect(router.currentRoute.value.matched[0]?.components?.default).toBeDefined()
  })
})
