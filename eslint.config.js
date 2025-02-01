import globals from "globals";
import eslintJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import vitestPlugin from "@vitest/eslint-plugin";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ["**/dist"] },
  eslintJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      react: pluginReact,
      vitest: vitestPlugin,
      "react-hooks": reactHooksPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...vitestPlugin.environments.env.globals,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "vitest/expect-expect": "off",
      "padding-line-between-statements": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "react/react-in-jsx-scope": "off",
      "react/jsx-curly-brace-presence": [
        "error",
        {
          props: "never",
          children: "ignore",
        },
      ],
    },
  },
];
