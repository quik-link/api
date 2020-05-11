/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {HEndpointGroup} from "@element-ts/hydrogen";
import {userEndpoint} from "./user/user-endpoint";
import {linkEndpoint} from "./link/link-endpoint";

export const rootEndpoint = new HEndpointGroup();

rootEndpoint.attach("/user", userEndpoint);
rootEndpoint.attach("/link", linkEndpoint);