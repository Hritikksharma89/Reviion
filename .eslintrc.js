export default {
  extends: ['eslint:recommended', 'prettier'],

  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
      },
    ],
  },
}
