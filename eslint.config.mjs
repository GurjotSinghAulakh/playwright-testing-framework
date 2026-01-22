import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import playwrightPlugin from "eslint-plugin-playwright";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true
      }
    },
    plugins: {
      import: importPlugin
    },
    rules: {
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true }
        }
      ]
    }
  },
  {
    files: [
      "apps/**/tests/**/*.ts",
      "apps/**/playwright.config.ts",
      "**/*.spec.ts",
      "**/*.test.ts"
    ],
    plugins: {
      playwright: playwrightPlugin
    },
    rules: {
      "playwright/no-focused-test": "error",
      "playwright/no-skipped-test": "warn",
      "playwright/expect-expect": "error"
    }
  },
  prettierConfig,
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/playwright-report/**",
      "**/test-results/**"
    ]
  }
];
