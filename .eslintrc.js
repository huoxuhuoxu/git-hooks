module.exports = {
    "extends": "eslint:recommended",
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
    "rules": {
        "no-console": "off",
        "eqeqeq": "error",
        "no-alert": "warn",
        "no-eval": "error",
        "semi": [
            "error",
            "always"
        ],
        "strict": "error",
        "no-unused-vars": ["error", { "vars": "all", "args": "none", "ignoreRestSiblings": false }]
};




