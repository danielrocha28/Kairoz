import pluginJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import globals from 'globals';

export default [
  {
    // Define language options, including global variables and parser settings
    languageOptions: {
      globals: {
        // Add Node.js and browser global variables
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        // Support ECMAScript 2022 syntax
        ecmaVersion: 2022,
        // Set source type to 'module' for ES Modules
        sourceType: 'module',
      },
    },
    // Register the ESLint plugin for import rules
    plugins: {
      import: pluginImport,
    },
    // Define custom linting rules
    rules: {
      // Warn on console usage
      'no-console': 'warn',
      // Enforce strict equality checks (=== and !==)
      'eqeqeq': 'error',
      // Disallow unnecessary 'return await'
      'no-return-await': 'error',
      // Ensure that errors are returned only as Error objects in promises
      'prefer-promise-reject-errors': 'error',
      // Disallow async functions without await expressions
      'require-await': 'error',
      // Warn on unused variables, ignoring function arguments
      'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
      // Enforce single quotes for strings
      'quotes': ['error', 'single'],
      // Require semicolons at the end of statements
      'semi': ['error', 'always'],
    },
  },
  {
    // Apply recommended ESLint and import plugin rules to all .js files
    files: ['**/*.js'],
    rules: {
      // Include recommended ESLint rules
      ...pluginJs.configs.recommended.rules,
      // Include recommended import plugin rules
      ...pluginImport.configs.recommended.rules,
    },
  },
];
