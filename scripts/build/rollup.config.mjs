import { join } from "node:path";
import { createRequire } from "node:module";
// eslint-disable-next-line import/no-named-as-default
import externals from "rollup-plugin-node-externals";
import summary from "rollup-plugin-output-size";
import minify from "@rollup/plugin-terser";
import { swc } from "rollup-plugin-swc3";
import dts from "rollup-plugin-dts";

const require = createRequire(import.meta.url);
const isDev = process.argv.includes("-w");
const pkg = require(join(process.cwd(), "./package.json"));

const jsBundleConfig = {
	input: pkg.source,
	output: [
		{
			format: "cjs",
			file: pkg.main,
			sourcemap: true,
		},
		{
			format: "es",
			file: pkg.module,
			sourcemap: true,
		},
	],
	plugins: [
		externals(),
		swc({ sourceMaps: true }),
		!isDev &&
			minify({
				// Preserve pure annotations to enable tree shaking
				format: {
					preserve_annotations: true,
					comments(node, { value }) {
						return /#__PURE__/i.test(value);
					},
				},
			}),
		summary(),
	].filter(Boolean),
};

const dtsBundleConfig = {
	input: pkg.source,
	output: [{ file: pkg.types }],
	plugins: [
		dts({
			compilerOptions: {
				incremental: false,
			},
		}),
		summary(),
	],
};

// eslint-disable-next-line import/no-default-export
export default [jsBundleConfig, dtsBundleConfig];
