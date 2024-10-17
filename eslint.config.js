import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import tanstackQuery from '@tanstack/eslint-plugin-query'; // Añadido aquí

export default [
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint,
      '@tanstack/query': tanstackQuery, // Añadido aquí
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      'react/prop-types': 'off',
      indent: ['error', 2, { SwitchCase: 1 }],
      'linebreak-style': 1,
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@tanstack/query/exhaustive-deps': 'error', // Usando la regla de tanstack query
      '@tanstack/query/stable-query-client': 'error', // Usando la regla de tanstack query
    },
  },
];
