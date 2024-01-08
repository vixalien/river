import { Handlers } from "$fresh/server.ts";

import { getAllMedia } from "../util/get-media.ts";
import Grid, { GridData } from "./index.tsx";

// vsco api returns a 24 character hash
const hashRegex = /^[0-9a-fA-F]{24}$/;

function isValidId(id: string) {
  if (!id || typeof id !== "string") return false;

  return hashRegex.test(id);
}

export const handler: Handlers<GridData> = {
  async GET(_req, ctx) {
    const id = ctx.params.id;

    if (isValidId(id)) {
      const media = await getAllMedia();

      if (media.some((image) => image.image._id === id)) {
        return ctx.render({ media });
      }
    }

    return ctx.renderNotFound();
  },
};

export default Grid;
