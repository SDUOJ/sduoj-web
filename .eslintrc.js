module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: 0,
    'eol-last': 0,
    'no-trailing-spaces': 0,
    'no-unused-vars': ['warn'],
    'space-before-function-paren': 0,
    'vue/no-parsing-error': [0, { 'x-invalid-end-tag': false }],
    'no-multi-spaces': 0,
    camelcase: 0
  }
}
