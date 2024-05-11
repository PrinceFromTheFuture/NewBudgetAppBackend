module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/class-name-casing": [
      "error",
      {
        allowUnderscorePrefix: true, // If you also want to allow `_UserModel` as valid.
      },
    ],
  },
};
