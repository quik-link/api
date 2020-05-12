/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {HHTTPServer} from "@element-ts/hydrogen";
import {SiDatabase} from "@element-ts/silicon";
import {rootEndpoint} from "./endpoints/root-endpoint";
import {Logger} from "./Logger";

(async (): Promise<void> => {

	Logger.neon.setTitle("quik-link");

	await SiDatabase.init({
		database: "quiklink",
		address: "mongodb://localhost:27017",
		debug: true
	});

	new HHTTPServer(rootEndpoint, {debug: true}).start(3000);

})().catch((err: any) => console.error(err));

