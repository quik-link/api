/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {HHTTPServer} from "@element-ts/hydrogen";
import {SiDatabase} from "@element-ts/silicon";
import {rootEndpoint} from "./endpoints/root-endpoint";

(async (): Promise<void> => {

	await SiDatabase.init({
		database: "quiklink",
		address: "mongodb://localhost:27017",
		verbose: true
	});

	new HHTTPServer(rootEndpoint, {debug: true}).start(3000);

})().catch((err: any) => console.error(err));

