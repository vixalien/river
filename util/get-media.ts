import { getProfileMedia, ImageMedium, setToken } from "vsco-api";
import { join } from "$std/path/mod.ts";
import { __env } from "./env.ts";

setToken(__env.API_TOKEN);

const CACHE_FILE = join(Deno.cwd(), "cache", "media.json");

export async function getAllMedia() {
  if (__env.NODE_ENV === "development" && await cacheExists()) {
    const json = await Deno.readTextFile(CACHE_FILE);

    return JSON.parse(json) as ImageMedium[];
  }

  const id = Number(__env.USER_ID);

  if (!id || Number.isNaN(id)) {
    throw new Error("Please provide a numeric USER_ID environment variable");
  }

  const media: ImageMedium[] = [];
  let cursor: string | undefined = undefined;

  do {
    const { media: profileMedia, next_cursor } = await getProfileMedia(id, {
      limit: 30,
      cursor,
    });

    media.push(...profileMedia);
    cursor = next_cursor;
  } while (cursor);

  // TODO: allow using cache in production

  if (__env.NODE_ENV === "development") {
    await Deno.writeTextFile(CACHE_FILE, JSON.stringify(media, null, 2));
  }

  return media;
}

async function cacheExists() {
  try {
    await Deno.stat(CACHE_FILE);
    return true;
  } catch {
    return false;
  }
}
