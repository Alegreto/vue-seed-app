<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div>
    <h1>{{ t('contact.title') }}</h1>
    <p>
      {{ t('contact.description') }}
    </p>
  </div>
</template>
