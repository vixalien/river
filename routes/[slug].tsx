import { Handlers } from "$fresh/server.ts";

import images from "../images.json" assert { type: "json" };
import Grid from "./index.tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    const url = new URL(req.url);

    if (images.media.some((image) => `/${image.image._id}` === url.pathname)) {
      return ctx.render({ url });
    }

    return ctx.renderNotFound();
  },
};

export default Grid;
