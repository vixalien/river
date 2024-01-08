import { getProfileMedia, ImageMedium, setToken } from "vsco-api";

console.log("env")

setToken(Deno.env.get("API_TOKEN")!);

export async function getAllMedia() {
  const id = Number(Deno.env.get("USER_ID"));

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

  return media;
}
