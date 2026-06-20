import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

// eslint-config-next v16 ships native flat configs, so they're imported and
// spread directly. (Earlier versions were consumed via @eslint/eslintrc's
// FlatCompat.extends("next/..."), which v16 no longer supports — it threw a
// circular-structure error during config validation.)
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Vendored reference template — untracked and already excluded in
      // tsconfig.json; not part of the app, so don't lint it.
      "template-solar-main/**",
    ],
  },
  {
    rules: {
      "react/no-unescaped-entities": "warn",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@next/next/no-html-link-for-pages": "warn",
      // React Compiler rules newly enforced as errors by eslint-config-next 16.
      // The existing codebase predates them; keep as warnings so CI/commits stay
      // green, and address the flagged effect/purity sites incrementally.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
    },
  },
];

export default eslintConfig;
