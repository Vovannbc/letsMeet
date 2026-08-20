// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const eslintPluginReactNative = require("eslint-plugin-react-native");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ["node_modules/**", "android/**", "ios/**", "build/**", "dist/**"],
  },
  {
    plugins: {
      "react-native": eslintPluginReactNative,
    },
    rules: {
      "object-curly-spacing": ["error", "always"],
    },
    settings: {
      react: { version: "detect" },
    },
  },
]);
