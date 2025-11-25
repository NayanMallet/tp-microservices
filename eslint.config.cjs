const globals = require('globals');
const eslintConfigPrettier = require('eslint-config-prettier/flat');

module.exports = [
  eslintConfigPrettier,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    ignores: ['node_modules/', 'dist/'],
    rules: {
      // tes règles personnalisées
    },
  },
];
