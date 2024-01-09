import { Handlers, PageProps } from "$fresh/server.ts";
import { ImageMedium } from "vsco-api";

import { Photos } from "../components/Photos.tsx";
import { getAllMedia } from "../util/get-media.ts";
import { env } from "../util/env.ts";
import { Head } from "../components/Head.tsx";
import { imageLink } from "../components/Photo.tsx";

export default function Grid({ url, data }: PageProps<GridData>) {
  let media = data.media
    .sort((a, b) => b.image.capture_date_ms - a.image.capture_date_ms);

  if (env.DEFAULT_REVERSE_SORT == "1") {
    media = media.reverse();
  }

  return (
    <>
      <Head thumbnail={imageUri(media[0])} />
      <main>
        <Photos images={media} url={url} />
        <ul class="links bottom">
          {env.ALLOW_ORDER_SORT_CHANGE == "1" && (
            <li class="sort">
              <a rel="me" href="#" title="Reverse sort order">Sort</a>
            </li>
          )}
          {env.SHOW_RSS_FEED == "1" && (
            <li class="rss">
              <a
                rel="alternate"
                type="application/rss+xml"
                href="/feed.xml"
                title="RSS Feed"
              >
                RSS Feed
              </a>
            </li>
          )}
          {env.TWITTER_USERNAME != "" && (
            <li class="twitter">
              <a
                rel="me"
                href={`https://twitter.com/${env.TWITTER_USERNAME}`}
                title={`@${env.TWITTER_USERNAME} on Twitter`}
              >
                Twitter
              </a>
            </li>
          )}
          {env.GITHUB_USERNAME != "" && (
            <li class="github">
              <a
                rel="me"
                href={`https://github.com/${env.GITHUB_USERNAME}`}
                title={`@${env.GITHUB_USERNAME} on Github`}
              >
                Github
              </a>
            </li>
          )}
          {env.INSTAGRAM_USERNAME != "" && (
            <li class="instagram">
              <a
                rel="me"
                href={`https://instagram.com/${env.INSTAGRAM_USERNAME}`}
                title={`@${env.INSTAGRAM_USERNAME} on Instagram`}
              >
                Github
              </a>
            </li>
          )}
          {env.CUSTOM_LINK_URL != "" && env.CUSTOM_LINK_NAME != "" && (
            <li class="link">
              <a
                rel="me"
                href={env.CUSTOM_LINK_URL}
                title={env.CUSTOM_LINK_NAME}
              >
                {env.CUSTOM_LINK_NAME}
              </a>
            </li>
          )}
        </ul>
      </main>
    </>
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

function imageUri(image: ImageMedium) {
  return imageLink(image.image, 600);
}
