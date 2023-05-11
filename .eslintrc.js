module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ["plugin:vue/essential", "eslint:recommended", "plugin:prettier/recommended", "prettier"],
	parserOptions: {
		parser: "@babel/eslint-parser",
	},
	rules: {
		// eslint-disable-next-line
		"no-unused-vars": "off",
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"prettier/prettier": [
			"error",
			{
				"endOfLine": "auto",
				"printWidth": 120,
				"tabWidth": 2,
				"singleQuote": false,
				"trailingCom ma": "all",
				"semi": true,
				"jsxBracketSameLine": false,
				"proseWrap": "preserve",
				"quoteProps": "consistent",
				"bracketSpacing": true,
				"useTabs": true,
			},
		],
	},
	globals: {
		kakao: true,
	},
};
