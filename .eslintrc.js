module.exports = {
  plugins: ["react", "@typescript-eslint", "react-hooks", "import"],
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "react-hooks/exhaustive-deps": ["error"],
  },
  overrides: [
    {
      files: `**/*.+(ts|tsx)`,
      parser: `@typescript-eslint/parser`,
      parserOptions: {
        project: `./tsconfig.json`,
      },
      plugins: [`@typescript-eslint`],
      extends: [`plugin:@typescript-eslint/recommended`, `plugin:prettier/recommended`],
      rules: {
        "prettier/prettier": ["off"],
        "@typescript-eslint/quotes": [
          2,
          `backtick`,
          {
            avoidEscape: true,
          },
        ],
        "react/jsx-curly-brace-presence": [1, { props: "never", children: "never" }],
      },
    },
  ],
};
