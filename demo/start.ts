import { dirname } from "$std/path/dirname.ts";
import { join } from "$std/path/join.ts";

import { load } from "$std/dotenv/mod.ts";

const __dirname = dirname(new URL(import.meta.url).pathname);

const env = await load({ envPath: join(__dirname, ".env") });

const command = new Deno.Command(Deno.execPath(), {
  args: ["task", "start"],
  cwd: join(__dirname, ".."),
  env,
});

command.spawn();
