import { PageProps } from "$fresh/server.ts";
import { ImageMedium } from "vsco-api";

import { Photos } from "../components/Photos.tsx";
import images from "../images.json" assert { type: "json" };

export default function Grid({ url }: PageProps) {
  return (
    <main>
      <Photos images={images.media as ImageMedium[]} url={url} />
    </main>
  );
}
