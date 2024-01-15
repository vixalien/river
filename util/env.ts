// This code should only be seen in the browser

import { parse } from "$std/dotenv/mod.ts";
import { join } from "$std/path/join.ts";

if (!("Deno" in window)) {
  throw new Error("This code should only be seen in the browser");
}

export function absoluteUrl(path: string) {
  return new URL(path, env.URL!).toString();
}

export const ALLOWED_VALUES = Object.keys(
  parse(Deno.readTextFileSync(join(Deno.cwd(), ".env.defaults"))),
);

export const env = Object.fromEntries(
  Object.entries(Deno.env.toObject()).filter(([key]) =>
    ALLOWED_VALUES.includes(key)
  ),
);

