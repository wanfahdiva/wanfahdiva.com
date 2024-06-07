module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'eslint-plugin-import-helpers'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'next',
    'plugin:@next/next/recommended',
    'next/core-web-vitals'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  rules: {
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'newline-before-return': 2,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'prettier/prettier': ['error', { bracketSameLine: false, jsxBracketSameLine: false }],
    'import-helpers/order-imports': [
      2,
      {
        newlinesBetween: 'always',
        groups: [['/^next/', 'module'], '/^@/styles/', '/^@/components/', '/^@/lib/', ['parent', 'sibling', 'index']],
        alphabetize: {
          order: 'asc',
          ignoreCase: true
        }
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_'
      }
    ]
  }
}
