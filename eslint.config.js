import eslint from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'
import oxlint from 'eslint-plugin-oxlint'

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'src/auto-imports.d.ts', 'src/components.d.ts']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  // 1. Reglas de accesibilidad recomendadas para componentes Vue
  ...pluginVueA11y.configs['flat/recommended'],

  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },

  // 2. Oxlint al final para deshabilitar reglas redundantes en ESLint
  ...oxlint.configs['flat/recommended']
)
