module.exports = {
  root: true,
  extends: [
    "@react-native",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",

    "plugin:react-native/all",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: ["prettier", "jsx-a11y"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "linebreak-style": 0,
    "no-use-before-define": "off",
    "no-unused-expressions": "off",
    "function-paren-newline": "off",
    "implicit-arrow-linebreak": "off",
    "comma-dangle": ["error", "only-multiline"],
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "react-hooks/exhaustive-deps": "off",
    "react-native/no-color-literals": "off",
    "react-native/no-inline-styles": "off",
    "react-native/sort-styles": "off",
    "react/function-component-definition": [
      "warn",
      {
        namedComponents: [
          "function-declaration",
          "function-expression",
          "arrow-function",
        ],
        unnamedComponents: ["function-expression", "arrow-function"],
      },
    ],
    "object-curly-newline": "off",
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
  },
};
