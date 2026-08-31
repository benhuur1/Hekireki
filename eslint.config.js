import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'dist-ssr']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    /* Entrada do prerender: roda em Node, no build, e nunca participa de
       fast refresh — exportar a tabela de rotas junto do render é o ponto
       dela, para o script de prerender ler tudo de um módulo só. */
    files: ['src/entry-server.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
