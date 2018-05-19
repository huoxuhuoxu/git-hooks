module.exports = {
  "parser": "babel-eslint",

  "plugins": ["react"],

  "extends": [
    "eslint:recommended", "plugin:react/recommended"
  ],

  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },

  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true
  },

  //微信小程序的全局变量
  "globals": {
    "getApp": true,
    "App": true,
    "Page": true,
    "getCurrentPages": true,
    "wx": true
  },

  "ecmaFeatures": {},

  "rules": {
    "no-console": "warn",
    "eqeqeq": "error",
    "no-alert": "warn",
    "no-eval": "error",
    "semi": "off",
    "strict": "error",
    "no-unused-vars": [
      "error", {
        "vars": "all",
        "args": "none",
        "ignoreRestSiblings": false
      }
    ]
  }
};