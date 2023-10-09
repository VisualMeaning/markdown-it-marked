/*
 * ESLint configuration for library, tests, and config files.
 *
 * Copyright 2020 Visual Meaning Ltd
 * This is free software licensed as Apache-2.0 - see COPYING for terms.
 */

const rules = {
  'array-bracket-newline': ['warn', 'consistent'],
  'array-bracket-spacing': 'warn',
  'arrow-spacing': 'warn',
  'block-spacing': 'warn',
  'brace-style': 'warn',
  'comma-dangle': ['warn', 'always-multiline'],
  'comma-spacing': 'warn',
  'comma-style': 'warn',
  'complexity': ['warn', 5],
  'computed-property-spacing': 'warn',
  'consistent-return': 'error',
  'curly': 'error',
  'eol-last': 'warn',
  'eqeqeq': ['error', 'smart'],
  'implicit-arrow-linebreak': 'warn',
  'indent': ['warn', 2],
  'key-spacing': 'warn',
  'no-else-return': 'error',
  'no-multi-spaces': 'error',
  'no-redeclare': 'off',
  'no-tabs': 'error',
  'no-trailing-spaces': 'warn',
  'no-var': 'error',
  'no-whitespace-before-property': 'warn',
  'object-curly-newline': 'warn',
  'object-curly-spacing': 'warn',
  'object-shorthand': 'warn',
  'one-var': ['error', 'never'],
  'operator-linebreak': ['warn', 'before'],
  'prefer-const': 'warn',
  'quote-props': ['warn', 'consistent'],
  'semi': 'warn',
  'semi-style': 'warn',
  'space-in-parens': 'warn',
  'space-infix-ops': 'warn',
  'unicode-bom': 'error',
};

module.exports = {
  extends: ['eslint:recommended'],
  ignorePatterns: '/dist',
  overrides: [{
    env: {
      'browser': true,
      'es6': true,
    },
    files: ['src/*.js'],
  }, {
    env: {
      'jest/globals': true,
    },
    extends: ['plugin:jest/recommended'],
    files: ['test/*.js'],
  }, {
    files: ['*.config.js', '.*.js'],
    globals: {
      module: false,
    },
    rules: {
      'sort-keys': 'warn',
    },
  }],
  parser: '@babel/eslint-parser',
  rules,
};
