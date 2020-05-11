/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {HHTTPServer} from "@element-ts/hydrogen";
import {SiDatabase} from "@element-ts/silicon";
import {rootEndpoint} from "./endpoints/root-endpoint";
import {Neon} from "@element-ts/neon";

(async (): Promise<void> => {

	Neon.setTitle("quik-link/core");

	await SiDatabase.init({
		database: "quiklink",
		address: "mongodb://localhost:27017",
		verbose: false
	});

	new HHTTPServer(rootEndpoint, {debug: false}).start(3000);

})().catch((err: any) => console.error(err));

