/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {HError, HErrorStatusCode, HRequest} from "@element-ts/hydrogen";
import {SiQuery} from "@element-ts/silicon";
import {Token, User} from "@quik-link/core";

export async function verifyToken(req: HRequest): Promise<Token> {

	const authHeader = req.getHeaders().authorization;
	if (authHeader === undefined) throw authError();
	const tokenId = authHeader.split(" ")[1];
	if (tokenId === undefined) throw authError();

	const token = await SiQuery.getObjectForId(Token, tokenId);
	if (token === undefined) throw authError();
	if (token.props.alive !== true) throw authError();

	return token;

}

export async function verifyUser(req: HRequest): Promise<User> {

	return (await verifyToken(req)).getUser();

}

function authError(): HError {
	return HError.init().code(HErrorStatusCode.UnAuthorized).msg("Invalid session token.").show();
}