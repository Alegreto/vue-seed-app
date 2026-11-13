<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div>
    <h1>{{ t('home.title') }}</h1>
    <p>{{ t('home.description') }}.</p>

    <!-- Componente de prueba de Element Plus -->
    <el-button type="primary">
      {{ t('home.btnTest') }}
    </el-button>
  </div>
</template>