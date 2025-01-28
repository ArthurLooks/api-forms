import pluginJs from '@eslint/js'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser }},
	{ languageOptions: { globals: { global: true, process: true } } },
	pluginJs.configs.recommended,
]
