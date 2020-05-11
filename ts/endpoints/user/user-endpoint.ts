/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {HEndpointGroup, HErrorStatusCode, HEndpointBuilder} from "@element-ts/hydrogen";
import {userMeEndpoint} from "./user-me-endpoint";
import {ORegex, OStandardType} from "@element-ts/oxygen";
import {User} from "@quik-link/core";
import {SiQuery} from "@element-ts/silicon";

export const userEndpoint = new HEndpointGroup();

userEndpoint.attach("/me", userMeEndpoint);

userEndpoint.add(HEndpointBuilder
	.post("/sign-up")
	.types({
		firstName: OStandardType.string,
		lastName: OStandardType.string,
		email: OStandardType.string,
		password: OStandardType.string
	})
	.listener(async(req, res) => {

		const body: {firstName: string, lastName: string, email: string, password: string} = req.getBody();
		if ((await (new SiQuery(User, {email: body.email})).exists())) {
			return res.err(HErrorStatusCode.NotAcceptable, "A user already exists with this email.");
		}

		let user: User;
		try {
			user = await User.signUp(body);
		} catch (e) {
			return res.err(HErrorStatusCode.NotAcceptable, e.message);
		}

		const session = await user.generateToken();
		res.send({token: session.getId()});

	})
);

userEndpoint.add(HEndpointBuilder
	.post("/sign-in")
	.types({
		email: OStandardType.string,
		password: OStandardType.string
	})
	.listener(async(req, res) => {

		const body: {email: string, password: string} = req.getBody();
		let user: User;
		try {
			user = await User.signIn(body.email, body.password);
		} catch (e) {
			return res.err(HErrorStatusCode.NotAcceptable, e.message);
		}

		res.send({
			token: (await user.generateToken()).getId()
		});

	})
);