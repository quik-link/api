/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {HEndpointGroup} from "@element-ts/hydrogen";
import {userMeEndpoint} from "./user-me-endpoint";
import {HEndpointBuilder} from "@element-ts/hydrogen/dts/HEndpointBuilder";
import {OStandardType, ORegex} from "@element-ts/oxygen";

export const userEndpoint = new HEndpointGroup();

userEndpoint.attach("/me", userMeEndpoint);

userEndpoint.add(HEndpointBuilder
	.post("/sign-in")
	.types({
		email: ORegex.email(),
		password: OStandardType.string
	})
	.listener(async(req, res) => {



	})
);

userEndpoint.add(HEndpointBuilder
	.post("/sign-up")
	.types({
		firstName: OStandardType.string,
		lastName: OStandardType.string,
		email: ORegex.email(),
		password: OStandardType.string
	})
	.listener(async(req, res) => {

	})
);