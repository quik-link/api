/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {HEndpointGroup} from "@element-ts/hydrogen";
import {HEndpointBuilder} from "@element-ts/hydrogen/dts/HEndpointBuilder";
import {ORegex, OStandardType} from "@element-ts/oxygen";

export const linkEndpoint = new HEndpointGroup();

linkEndpoint.add(HEndpointBuilder
	.post("/")
	.types({
		name: OStandardType.string,
		url: ORegex.url()
	})
	.listener(async (req, res) => {

	})
);

linkEndpoint.add(HEndpointBuilder
	.get("/")
	.types({id: OStandardType.string})
	.listener(async (req, res) => {

	})
);

linkEndpoint.add(HEndpointBuilder
	.get("/visits")
	.types({id: OStandardType.string})
	.listener(async (req, res) => {

	})
);

linkEndpoint.add(HEndpointBuilder
	.put("/name")
	.types({
		id: OStandardType.string,
		name: OStandardType.string
	})
	.listener(async (req, res) => {

	})
);

linkEndpoint.add(HEndpointBuilder
	.delete("/")
	.types({id: OStandardType.string})
	.listener(async (req, res) => {

	})
);