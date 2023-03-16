import kleur from "kleur";

export const logError = (message: string, error: Error) => {
	console.error(kleur.red(`❌ ${message}\nDetails:`), error);
};

export const logSuccess = (message: string) => {
	console.log(kleur.green(`✅ ${message}`));
};
