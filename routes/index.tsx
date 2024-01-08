import { Handlers, PageProps } from "$fresh/server.ts";
import { ImageMedium } from "vsco-api";

import { Photos } from "../components/Photos.tsx";
import { getAllMedia } from "../util/get-media.ts";

export default function Grid({ url, data }: PageProps<GridData>) {
  return (
    <main>
      <Photos images={data.media} url={url} />
    </main>
  );
}

export interface GridData {
  media: ImageMedium[];
}

export const handler: Handlers<GridData> = {
  async GET(_req, ctx) {
    const media = await getAllMedia();

    return ctx.render({ media });
  },
};
