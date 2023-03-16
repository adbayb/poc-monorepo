const fixFormattingCommand = "prettier --write --ignore-unknown";

module.exports = {
	"**/*.{js,cjs,mjs,ts,tsx}": [
		"eslint --fix",
		"jest --findRelatedTests --passWithNoTests",
	],
	"**/*.{md,mdx}": "eslint --fix",
	"**/!(pnpm-lock).{yaml,yml}": fixFormattingCommand,
	"!**/*.{js,cjs,mjs,ts,tsx,md,mdx,yaml,yml}": fixFormattingCommand,
};
