import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
    baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
})

export default [{
    ignores: [
        '**/node_modules',
        '**/.github',
        '**/dist',
        '**/build',
        '**/publish',
        '**/static',
    ],
}, ...compat.extends('plugin:jsonc/recommended-with-json5'), {
    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: 'latest',
        sourceType: 'script',
    },

    rules: {
        semi: ['error', 'never', {
            beforeStatementContinuationChars: 'never',
        }],

        'semi-spacing': ['error', {
            after: true,
            before: false,
        }],

        'semi-style': ['error', 'first'],
        'no-extra-semi': 'error',
        'no-unexpected-multiline': 'error',
        'no-unreachable': 'error',

        'space-infix-ops': ['error', {
            int32Hint: false,
        }],

        'space-before-function-paren': ['error', {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always',
        }],

        'space-before-blocks': ['error', 'always'],
        quotes: [2, 'single'],

        'comma-spacing': ['error', {
            after: true,
            before: false,
        }],

        'spaced-comment': 'error',
        'operator-linebreak': ['error', 'none'],
        'no-multi-spaces': 'error',

        'key-spacing': ['error', {
            afterColon: true,
        }],

        'no-else-return': 'error',
        camelcase: 'error',
        'brace-style': 'error',
        'no-var': 'error',

        'no-multiple-empty-lines': ['error', {
            max: 1,
        }],
    },
}]