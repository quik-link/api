/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {HEndpointGroup} from "@element-ts/hydrogen";
import {HEndpointBuilder} from "@element-ts/hydrogen/dts/HEndpointBuilder";
import {ORegex, OStandardType} from "@element-ts/oxygen";

export const userMeEndpoint = new HEndpointGroup();

userMeEndpoint.add(HEndpointBuilder
	.get("/")
	.listener(async(req, res) => {

	})
);

userMeEndpoint.add(HEndpointBuilder
	.put("/name")
	.types({
		firstName: OStandardType.string,
		lastName: OStandardType.string
	})
	.listener(async(req, res) => {

	})
);

userMeEndpoint.add(HEndpointBuilder
	.put("/email")
	.types({
		email: ORegex.email(),
		password: OStandardType.string
	})
	.listener(async(req, res) => {

	})
);

userMeEndpoint.add(HEndpointBuilder
	.put("/password")
	.types({
		oldPassword: OStandardType.string,
		newPassword: OStandardType.string
	})
	.listener(async(req, res) => {

	})
);

const sessionEndpoint = new HEndpointGroup();

sessionEndpoint.add(HEndpointBuilder
	.get("/")
	.listener(async(req, res) => {

	})
);

sessionEndpoint.add(HEndpointBuilder
	.delete("/")
	.listener(async(req, res) => {

	})
);

sessionEndpoint.add(HEndpointBuilder
	.get("/all")
	.listener(async(req, res) => {

	})
);

userMeEndpoint.attach("/session", sessionEndpoint);