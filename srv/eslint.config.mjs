import globals from "globals";
import pluginJs from "@eslint/js";
{
  "env"; {
    "node"; true
  }
}



export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
];