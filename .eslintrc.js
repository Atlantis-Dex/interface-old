module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "plugin:react/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules":{
    "@typescript-eslint/no-explicit-any": 0,
    "semi": [2, "always"],
    "object-curly-spacing": ["error", "always"],
    "quotes": ["error", "double"],
    "jsx-quotes": ["error", "prefer-double"],
    "indent": ["error", 2]
  }
};
