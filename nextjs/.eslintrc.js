module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  plugins: ['react', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',
    // Disable Next.js specific rules that might cause issues
    '@next/next/no-img-element': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    '@next/next/no-page-custom-font': 'off',
    '@next/next/no-sync-scripts': 'off',
    '@next/next/no-typos': 'off',
    '@next/next/no-css-tags': 'off',
    '@next/next/no-head-element': 'off',
    '@next/next/no-title-in-document-head': 'off',
    '@next/next/no-google-font-display': 'off',
    '@next/next/no-document-import-in-page': 'off',
    '@next/next/no-script-component-in-head': 'off',
    '@next/next/no-unwanted-polyfillio': 'off',
    '@next/next/no-before-interactive-script-outside-document': 'off',
    '@next/next/no-styled-jsx-in-document': 'off',
    '@next/next/no-duplicate-head': 'off',
  },
};
