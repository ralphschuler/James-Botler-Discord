module.exports = {
  plugins: ["@babel"],
  env: {
    node: true,
  },
  parser: "@babel/eslint-parser",
  extends: ["eslint:recommended"],
  rules: {
    "no-console": 0,
    "@babel/new-cap": "error",
    "@babel/no-invalid-this": "error",
    "@babel/no-unused-expressions": "error",
    "@babel/object-curly-spacing": "error",
    "@babel/semi": "error",
  },
};
