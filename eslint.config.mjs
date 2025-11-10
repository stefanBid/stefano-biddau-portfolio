// eslint.config.mjs
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ignores: [
    // === Auto-generated folders ===
    '.nuxt',
    '.output',
    '.vercel',
    'dist',
    'node_modules',

    // === Lock / build / config files ===
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '*.log',

    // === Static assets ===
    'public/**',
    'static/**',

    // === Local / temporary folders ===
    '.vscode/**',
    '.idea/**',
  ],

  files: [
    '**/*.js',
    '**/*.ts',
    '**/*.vue',
    '**/*.mjs',
    '**/*.cjs',
  ],

  rules: {
    // === Code Quality ===
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': 'error',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'eqeqeq': 'error',
    'curly': 'error',

    // === Style & Readability ===
    'semi': ['warn', 'never'],
    'quotes': ['warn', 'single', { allowTemplateLiterals: true }],
    'comma-dangle': ['warn', 'always-multiline'],
    'arrow-parens': ['warn', 'always'],
    'object-curly-spacing': ['warn', 'always'],
    'array-bracket-spacing': ['warn', 'never'],
    'indent': ['warn', 2, { SwitchCase: 1 }],
    'space-before-blocks': ['warn', 'always'],
    'keyword-spacing': ['warn', { before: true, after: true }],
    'space-infix-ops': 'warn',
    'eol-last': ['error', 'always'],

    // === Logical Spacing ===
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
    ],

    // === Vue Specific ===
    'vue/multi-word-component-names': 'off',
    'vue/html-indent': ['warn', 2],
    'vue/first-attribute-linebreak': [
      'warn',
      { singleline: 'ignore', multiline: 'below' },
    ],
    'vue/max-attributes-per-line': [
      'warn',
      { singleline: 3, multiline: 1 },
    ],
    'vue/attributes-order': ['warn', { alphabetical: true }],
    'vue/html-self-closing': [
      'warn',
      {
        html: { void: 'always', normal: 'never', component: 'always' },
        svg: 'always',
        math: 'always',
      },
    ],

    // === Vue Formatting ===
    'vue/block-tag-newline': [
      'warn',
      {
        singleline: 'always',
        multiline: 'always',
        maxEmptyLines: 0,
      },
    ],
    'vue/multiline-html-element-content-newline': [
      'warn',
      {
        ignoreWhenEmpty: true,
        allowEmptyLines: false,
      },
    ],

    // === Nuxt Specific ===
    'nuxt/nuxt-config-keys-order': 'off',
  },
})
