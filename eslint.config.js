import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import importPlugin from "eslint-plugin-import";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import prettierConfig from "eslint-config-prettier";
import module from "node:module";

const builtinModules = module.builtinModules.filter(
  (mod) => mod !== "constants",
);

export default tseslint.config(
  { ignores: ["dist"] },
  prettierConfig, // Disable formatting rules in your ESLint configuration.
  eslintPluginPrettierRecommended, // The plugin loads and runs Prettier inside ESLint.
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": "warn", // prettier 不应该占用 error
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Side effect imports.
            ["^\\u0000"],
            // Node.js builtins
            ["^node:", `^(${builtinModules.join("|")})(/.*|$)`],
            // Framework
            [
              "^react\u0000?$",
              "^next(/.*)?\u0000?$",
              "^jotai\u0000?$",
              "^@mui/",
            ],
            // Packages
            ["^@?\\w"],
            // Internal modules
            [
              "^(@/)?(minimals|lib|store|components|hooks|utils|types|constants)(/.*|$)",
            ],
            // Vendors
            ["^(@/)?(vendors)(/.*|$)"],
            // Absolute imports and other imports such as Vue-style `@/foo`.
            // Anything not matched in another group.
            ["^"],
            // Relative imports.
            // Anything that starts with a dot.
            ["^\\."],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
    },
  },
);
