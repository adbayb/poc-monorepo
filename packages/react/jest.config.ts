import { getProjectConfig } from "../../jest.config";

import pkg from "./package.json";

export default getProjectConfig({
	displayName: pkg.name,
	testEnvironment: "jsdom",
});
