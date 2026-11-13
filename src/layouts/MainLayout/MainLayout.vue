<script setup lang="ts">
import { watch, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useLocaleStore } from '@/stores/locale'
import { useThemeStore } from '@/stores/theme'

const localeStore = useLocaleStore()
const themeStore = useThemeStore()
const { locale, t } = useI18n()

watch(
  () => localeStore.currentLocale,
  (newLocale) => {
    locale.value = newLocale
    document.documentElement.lang = newLocale
  },
  { immediate: true }
)

const isDark = computed({
  get: () => themeStore.currentTheme === 'dark',
  set: (val: boolean) => themeStore.setTheme(val ? 'dark' : 'light')
})

function onLocaleChange(val: string | number | boolean | undefined) {
  if (val === 'es' || val === 'en') {
    localeStore.setLocale(val)
  }
}
</script>

<template>
  <div class="layout-container">
    <!-- Cabecera global -->
    <header class="header">
      <div class="header-inner">
        <span class="logo">Vue + Pinia Demo</span>
        <nav class="nav">
          <RouterLink
            to="/"
            class="nav-link"
          >
            {{ t('nav.home') }}
          </RouterLink>
          <RouterLink
            to="/contact"
            class="nav-link"
          >
            {{ t('nav.contact') }}
          </RouterLink>
        </nav>

        <!-- Interruptor de tema Claro / Oscuro -->
        <el-switch
          v-model="isDark"
          :active-action-icon="Moon"
          :inactive-action-icon="Sunny"
          aria-label="Cambiar tema claro u oscuro"
        />

        <!-- Selector de idioma -->
        <el-radio-group 
          :model-value="localeStore.currentLocale" 
          size="small"
          @change="onLocaleChange"
        >
          <el-radio-button
            label="ES"
            value="es"
          />
          <el-radio-button
            label="EN"
            value="en"
          />
        </el-radio-group>
      </div>
    </header>

    <!-- Contenido inyectado por cada página -->
    <main class="main-content">
      <slot />
    </main>

    <!-- Pie de página global -->
    <footer class="footer">
      <p>{{ t('footer.rights') }}</p>
    </footer>
  </div>
</template>

<style scoped lang="scss" src="./MainLayout.scss"></style>