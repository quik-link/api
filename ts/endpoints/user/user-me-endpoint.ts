/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {HEndpointBuilder, HEndpointGroup, HErrorStatusCode} from "@element-ts/hydrogen";
import {OOptional, ORegex, OStandardType} from "@element-ts/oxygen";
import {KrBcrypt} from "@element-ts/krypton";
import {verifyToken, verifyUser} from "../auth";
import {SiQuery} from "@element-ts/silicon";
import {Token} from "@quik-link/core";

export const userMeEndpoint = new HEndpointGroup();

userMeEndpoint.add(HEndpointBuilder
	.get("/")
	.listener(async(req, res) => {

		const user = await (await verifyToken(req)).getUser();
		res.sendHObject(user);

	})
);

userMeEndpoint.add(HEndpointBuilder
	.put("/name")
	.types({
		firstName: OOptional.maybe(OStandardType.string),
		lastName: OOptional.maybe(OStandardType.string)
	})
	.listener(async(req, res) => {
		const body: {firstName?: string, lastName?: string} = req.getBody();
		const user = await (await verifyToken(req)).getUser();
		if (body.firstName !== undefined) user.props.firstName = body.firstName;
		if (body.lastName !== undefined) user.props.lastName = body.lastName;
		await user.update("firstName", "lastName");
		res.sendHObject(user);
	})
);

userMeEndpoint.add(HEndpointBuilder
	.put("/email")
	.types({
		email: OStandardType.string,
		password: OStandardType.string
	})
	.listener(async(req, res) => {
		const body: {email: string, password: string} = req.getBody();
		const user = await verifyUser(req);
		if (!await user.verifyPassword(body.password)) {
			return res.err(HErrorStatusCode.UnAuthorized, "Incorrect password.");
		}
		user.props.email = body.email;
		await user.update("email");
		res.sendHObject(user);
	})
);

userMeEndpoint.add(HEndpointBuilder
	.put("/password")
	.types({
		password: OStandardType.string,
		new: OStandardType.string
	})
	.listener(async(req, res) => {

		const body: {new: string, password: string} = req.getBody();
		const user = await verifyUser(req);
		if (!await user.verifyPassword(body.password)) {
			return res.err(HErrorStatusCode.UnAuthorized, "Incorrect password.");
		}

		const bcrypt = await KrBcrypt.createPassword(body.new);
		user.props.pepper = bcrypt.password;
		user.props.salt = bcrypt.salt;
		await user.update("pepper", "salt");

		res.sendHObject(user);
	})
);

const sessionEndpoint = new HEndpointGroup();

sessionEndpoint.add(HEndpointBuilder
	.get("/")
	.listener(async(req, res) => {
		const token = await verifyToken(req);
		res.send({
			id: token.getId(),
			userId: token.props.userId,
			alive: token.props.alive,
			updatedAt: token.getUpdatedAt(),
			createdAt: token.getCreatedAt()
		});
	})
);

sessionEndpoint.add(HEndpointBuilder
	.delete("/")
	.listener(async(req, res) => {
		const token = await verifyToken(req);
		token.props.alive = false;
		await token.update("alive");
		res.send([token.getId()]);
	})
);

sessionEndpoint.add(HEndpointBuilder
	.delete("/all")
	.listener(async(req, res) => {
		const user = await verifyUser(req);
		const query = new SiQuery(Token, {userId: user.getId(), alive: true});
		const tokens = await query.getAll();
		const killedIds: string[] = [];
		for (const token of tokens) {
			token.props.alive = false;
			await token.update("alive");
			killedIds.push(token.getId());
		}
		res.send(killedIds);
	})
);

userMeEndpoint.attach("/session", sessionEndpoint);