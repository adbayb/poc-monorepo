/**
 * @see https://www.conventionalcommits.org/
 */
module.exports = {
	extends: "@commitlint/config-conventional",
	rules: {
		"scope-enum": [2, "always", ["core", "react"]],
	},
};
