module.exports = {
  extends: [
    "airbnb-typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
  ],
  rules: {
    "react-hooks/exhaustive-deps": "warn",
  }
}
