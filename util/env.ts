// This code should only be seen in the browser

import { parse } from "$std/dotenv/mod.ts";
import { join } from "$std/path/join.ts";

if (!("Deno" in globalThis)) {
  throw new Error("This code should only be seen in the browser");
}

export const ALLOWED_VALUES = [
  "NODE_ENV",
  ...Object.keys(
    parse(Deno.readTextFileSync(join(Deno.cwd(), ".env.defaults"))),
  ),
];

export const __env = Object.fromEntries(
  Object.entries(Deno.env.toObject()).filter(([key]) =>
    ALLOWED_VALUES.includes(key),
  ),
);
