var OFF = 0, WARN = 1, ERROR = 2;

module.exports = exports = {
  "env": {
    "browser" : true,
    "node" : true,
    "es6": true,
    "jquery": true
  },
  "extends": [
    "eslint:recommended",
    "google"
  ],
  "rules": {
    "no-console": WARN,
    "no-undef": WARN,
    "no-unused-vars": WARN,
    "no-invalid-this": WARN,
    "require-jsdoc": WARN,
    "max-len": WARN,
    "no-multi-str": WARN
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  }
};