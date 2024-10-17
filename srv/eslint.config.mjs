import globals from 'globals';
import pluginJs from '@eslint/js';

export default {
  languageOptions: {
    globals: {
      // Including Node.js and browser global variables
      ...globals.node,
      ...globals.browser
    },
    parserOptions: {
      // ECMAScript 2022 syntax support
      ecmaVersion: 2022,
      // Setting source type to 'module' for ES Modules
      sourceType: 'module'
    },
  },
  extends: [
    // Extending the recommended ESLint configurations
    pluginJs.configs.recommended,
    // Ensuring correct order of imports and handling import errors
    'plugin:import/recommended'
  ],
  rules: {
    // Warn on console usage
    'no-console': 'warn',
    // Enforce strict equality checks (=== and !==)
    'eqeqeq': 'error',
    // Disallow returning await inside functions
    'no-return-await': 'error',
    // Ensure that promises are rejected with an error object
    'prefer-promise-reject-errors': 'error',
    // Require await in async functions to avoid errors
    'require-await': 'error',
    // Warn when there are unused variables in the code
    'no-unused-vars': ['warn', { 'args': 'none', 'ignoreRestSiblings': true }],
    // Enforce the use of single quotes for strings
    'quotes': ['error', 'single'],
    // Enforce the use of semicolons at the end of statements
    'semi': ['error', 'always']
  }
};
