import globals from 'globals';
import pluginJs from '@eslint/js';

export default {
  languageOptions: {
    globals: {
      ...globals.node,  // Inclui variáveis globais do Node.js
      ...globals.browser // Inclui variáveis globais do navegador, se necessário
    },
    parserOptions: {
      ecmaVersion: 2020, // Define a versão do ECMAScript a ser usada
      sourceType: 'module' // Define o tipo de módulo como ES
    },
  },
  extends: [
    pluginJs.configs.recommended // Inclui as regras recomendadas do plugin @eslint/js
  ],
  env: {
    node: true, // Permite o uso de variáveis globais do Node.js
    // adicione outros ambientes conforme necessário, como browser: true
  },
  rules: {
    // Adicione suas regras personalizadas aqui
  }
};
