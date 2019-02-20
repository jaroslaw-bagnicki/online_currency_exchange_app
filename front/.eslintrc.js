module.exports = {
    "env": {
        "browser": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module",
        "jsx": true

    },
    "rules": {
        "indent": ["error", 2],
        "linebreak-style": ["error", "windows"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "comma-dangle": ["error", "never"],
        "eol-last": ["error", "always"],
        "no-multiple-empty-lines": [
            "error",
            { "max": 1, "maxBOF": 0, "maxEOF": 0 }
        ],
        "no-console": "warn",
        "no-unused-vars": "warn",
        "react/no-deprecated": "off",
        "react/display-name": "off"
    },
    "settings": {
      "react": {
        "createClass": "createReactClass", 
        "pragma": "React",
        "version": "detect", 
        "flowVersion": "0.53"
      },
      "propWrapperFunctions": [
        "forbidExtraProps",
        {"property": "freeze", "object": "Object"},
        {"property": "myFavoriteWrapper"}
      ]
    },
};