module.exports = {
    env: {
        node: true,  
        es2021: true 
    },
    extends: [
        'eslint:recommended' 
    ],
    parserOptions: {
        ecmaVersion: 2015, 
        sourceType: 'script' 
    },
    rules: {
        'no-console': 'off',
        'semi': 'warn',
        'no-unused-vars': 'warn',
        'no-var': 'error',
        'prefer-const': 'warn',
        'eqeqeq': 'error',
        'no-undef': 'error',
        'no-extra-boolean-cast': 'error',
        'no-duplicate-imports': 'error',
        'no-unreachable': 'error',
        'no-constant-condition': 'warn',
    }
};