import { execa } from "execa";
import { fileURLToPath } from "node:url";

const isDev = process.argv.includes("--watch");

const BUNDLER_CONFIG_PATH = fileURLToPath(
	new URL("./rollup.config.mjs", import.meta.url),
);

const main = async () => {
	if (isDev) {
		(process.env.NODE_ENV as string) = "development";

		return execa("rollup", ["-c", BUNDLER_CONFIG_PATH, "-w"], {
			stdio: "inherit",
		});
	} else {
		(process.env.NODE_ENV as string) = "production";

		return execa("rollup", ["-c", BUNDLER_CONFIG_PATH], {
			stdio: "inherit",
		});
	}
};

main().catch((error) => {
	console.error("❌ An error occurred while bundling files", error);
	process.exit(1);
});
