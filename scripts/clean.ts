import { execa } from "execa";
import { rimraf } from "rimraf";

import { logError, logSuccess } from "./helpers";

const main = async () => {
	const { stdout } = await execa("git", [
		"ls-files",
		"--others",
		"--ignored",
		"--exclude-standard",
		"--directory",
	]);

	const removableArtifacts = stdout.split(/\n|\r\n/).filter((artifact) => {
		return !artifact.match(/\.husky|node_modules/);
	});

	if (removableArtifacts.length === 0) {
		logSuccess("Already clean");

		return;
	}

	// To make the task manager caching behavior more reliable, clean global cache as well if any artifact needs to be removed
	await rimraf(["node_modules/.cache", ...removableArtifacts]);

	logSuccess("Cleaned files:");

	for (const removedFile of removableArtifacts) {
		console.log(`${" ".repeat(4)}${removedFile}`);
	}
};

main().catch((error) => {
	logError(
		"An error occurred while cleaning files.\nSkipping the cleaning step.",
		error,
	);
	process.exit(1);
});
