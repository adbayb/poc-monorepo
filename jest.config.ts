import type { Config } from "jest";

const rootConfig: Config = {
	rootDir: "./",
	verbose: true,
	projects: ["<rootDir>/packages/*/jest.config.ts"],
	coverageDirectory: "./coverage",
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
		"!**/test.{ts,tsx}",
		"!**/*?(.)stories.{ts,tsx}",
		"!**/*.d.ts",
		"!src/react/**/*.{ts,tsx}",
	],
	coverageThreshold: {
		global: {
			branches: 60,
			functions: 60,
			lines: 60,
			statements: 60,
		},
	},
};

export default rootConfig;

export const getProjectConfig = ({
	displayName,
	testEnvironment,
}: Pick<Config, "displayName" | "testEnvironment">) => {
	const baseConfig = {
		displayName,
		testEnvironment,
		testRegex: "^.*/test.tsx?$",
		fakeTimers: {
			legacyFakeTimers: true,
		},
		transform: {
			"^.+\\.(t|j)sx?$": [
				"@swc/jest",
				{
					jsc: {
						transform: {
							react: {
								runtime: "automatic",
							},
						},
					},
				},
			],
		},
	};

	if (testEnvironment === "node") return baseConfig;

	return {
		...baseConfig,
		setupFilesAfterEnv: ["@testing-library/jest-dom"],
	};
};
