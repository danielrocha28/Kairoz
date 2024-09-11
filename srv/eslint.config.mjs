import globals from 'globals';
import pluginJs from '@eslint/js';

export default {
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.browser
    },
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    },
  },
  extends: [
    pluginJs.configs.recommended
  ],
  env: {
    node: true,
    // adicione outros ambientes conforme necessário
  },
  rules: {
    // Adicione suas regras personalizadas aqui
  }
};
