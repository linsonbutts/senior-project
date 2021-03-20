module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": [2, { ignore: ['children','trigger'] },]
    },
    'rules': {
        // we want to force semicolons
        'semi': ['warning', 'always'],
        // we use 2 spaces to indent our code
        'indent': ['warning', 1],
        // we want to avoid useless spaces
        'no-multi-spaces': ['warning']
}
};
