import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import';

export default [
  {
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
    plugins: {
      import: pluginImport,  // add the plugin import how obj
      js: pluginJs,          
    },
    rules: {
      // Define rules directly
      'no-console': 'warn',
      'eqeqeq': 'error',
      'no-return-await': 'error',
      'prefer-promise-reject-errors': 'error',
      'require-await': 'error',
      'no-unused-vars': ['warn', { 'args': 'none', 'ignoreRestSiblings': true }],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always']
    }
  },
  // Include recommended rules from the plugins directly
  pluginJs.configs.recommended,
  pluginImport.configs.recommended
];
