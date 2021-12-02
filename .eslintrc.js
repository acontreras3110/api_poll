// https://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
	},
	env: {
		es6: true,
		node: true,
		'jest/globals': true,
	},
	plugins: ['prettier', 'jest', 'import', '@typescript-eslint'],
	extends: ['eslint:recommended', 'airbnb-base', 'prettier'],
	// add your custom rules here
	rules: {
		'arrow-parens': 'off',
		indent: 'off',
		'new-cap': 'off',
		'no-tabs': 'off',
		'no-underscore-dangle': 'off',
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
		'class-methods-use-this': 'off',
		'no-param-reassign': 'off',
		'no-await-in-loop': 'off',
		'lines-between-class-members': 'off',
		'global-require': 'off',
		'import/extensions': 'off',
		'arrow-body-style': 'off',
		'import/no-extraneous-dependencies': 'off',
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': ['error'],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error'],
	},
	settings: {
		'import/resolver': {
			typescript: {},
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
};
