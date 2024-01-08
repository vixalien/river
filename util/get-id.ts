import { parseArgs } from "$std/cli/parse_args.ts";
import { getProfile } from "vsco-api";
import { setToken } from "../api/util/settings.ts";

import "$std/dotenv/load.ts";

import { env } from "./env.ts";

const api_token = env.API_TOKEN;

if (!api_token) {
  console.error("Please provide an API_TOKEN environment variable");
  Deno.exit(1);
}

setToken(api_token);

const args = parseArgs(Deno.args);
const username = args.username || args.u || args._[0];

if (!username) {
  console.error("Please provide a username");
  Deno.exit(1);
}

try {
  console.info(`Getting ${username}'s profile...`);

  const profile = await getProfile(username);

  console.log(`${username}'s ID is ${profile.sites[0].id}`);
} catch (e) {
  console.error(e);
  Deno.exit(1);
}
