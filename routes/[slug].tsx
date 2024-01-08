import { Handlers } from "$fresh/server.ts";

import { getAllMedia } from "../util/get-media.ts";
import Grid, { GridData } from "./index.tsx";

export const handler: Handlers<GridData> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const media = await getAllMedia();

    if (media.some((image) => `/${image.image._id}` === url.pathname)) {
      return ctx.render({ media });
    }

    return ctx.renderNotFound();
  },
};

export default Grid;
