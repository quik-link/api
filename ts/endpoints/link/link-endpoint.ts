/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {HEndpointBuilder, HEndpointGroup, HError, HErrorStatusCode, HRequest} from "@element-ts/hydrogen";
import {OStandardType} from "@element-ts/oxygen";
import {verifyToken, verifyUser} from "../auth";
import {Link} from "@quik-link/core";
import {SiQuery} from "@element-ts/silicon";
import {Neon} from "@element-ts/neon";
import {Logger} from "../../Logger";

export const linkEndpoint = new HEndpointGroup();

async function verifyLink(req: HRequest): Promise<Link> {
	const body: {id: string} = req.getBody();
	const user = await verifyUser(req);
	const link = await SiQuery.getObjectForId(Link, body.id);
	if (link === undefined) throw new HError(HErrorStatusCode.NotFound, "No link exists for this id.").show();
	if (user.getId() !== link.props.userId) throw new HError(HErrorStatusCode.UnAuthorized, "This is not your link.").show();
	return link;
}

linkEndpoint.add(HEndpointBuilder
	.post("/")
	.types({
		name: OStandardType.string,
		url: OStandardType.string
	})
	.listener(async (req, res) => {
		const body: {name: string, url: string} = req.getBody();
		const token = await verifyToken(req);

		const link = new Link();
		link.props.userId = token.props.userId;
		link.props.name = body.name;
		link.props.url = body.url;
		await link.create();

		res.sendHObject(link);

	})
);

linkEndpoint.getDynamic(async (req, res) => {
	const user = await verifyUser(req);
	const linkId = req.getEndpoint();
	const link = await SiQuery.getObjectForId(Link, linkId);
	if (link === undefined) return res.err(HErrorStatusCode.NotFound, "Link does not exist.");
	Logger.neon.log(user.getId());
	Logger.neon.log(link.props.userId);
	if (user.getId() !== link.props.userId) return res.err(HErrorStatusCode.UnAuthorized, "This is not your link.");
	res.sendHObject(link);
});

linkEndpoint.add(HEndpointBuilder
	.get("/all")
	.listener(async (req, res) => {
		const user = await verifyUser(req);
		const query = await new SiQuery(Link, {userId: user.getId()});
		const links: object[] = [];
		for (const link of await query.getAll()) links.push(link.bond());
		res.send(links);
	})
);

linkEndpoint.add(HEndpointBuilder
	.get("/visits")
	.listener(async (req, res) => {
		res.err(HErrorStatusCode.NotImplemented, "coming soon...");
	})
);

linkEndpoint.add(HEndpointBuilder
	.put("/name")
	.types({
		id: OStandardType.string,
		name: OStandardType.string
	})
	.listener(async (req, res) => {
		const link = await verifyLink(req);
		const body: {name: string} = req.getBody();
		link.props.name = body.name;
		await link.update("name");
		res.sendHObject(link);
	})
);

linkEndpoint.add(HEndpointBuilder
	.delete("/")
	.types({id: OStandardType.string})
	.listener(async (req, res) => {
		const link = await verifyLink(req);
		await link.delete();
		res.sendHObject(link);
	})
);