module.exports = {
  root: true,
  parserOptions: { sourceType: 'module' },
  env: { node: true, jest: true },
  extends: ['standard', 'prettier'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['prettier'],
};
