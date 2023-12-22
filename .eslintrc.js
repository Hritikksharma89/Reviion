export default {
    root: true,
    env: {
      node: true,
      es2021: true,
    },
    extends: ["standard-with-typescript", "eslint:recommended", "prettier"],
    overrides: [
      {
        env: {
          node: true,
        },
        files: [".eslintrc.{js,cjs,json}"],
        parserOptions: {
          sourceType: "script",
        },
      },
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {},
  };
  