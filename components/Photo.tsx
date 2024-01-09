import cn from "https://esm.sh/classnames@2.5.1";
import ColorHash from "color-hash";
import { basename } from "$std/path/basename.ts";

import { ImageMedium } from "vsco-api";
import { absoluteUrl, env } from "../util/env.ts";

export interface ImageProps {
  image: ImageMedium["image"];
  next?: string;
  previous?: string;
  matches?: boolean;
}

const colorHash = new ColorHash();

interface PaginationButtonProps {
  className: string;
  title: string;
  slug?: string;
  label: string;
}

export function Photo({ matches, image, previous, next }: ImageProps) {
  // check slug
  const slug = image._id;
  const id = `id-${slug}`;
  const imageUrl = imageLink(image, 480);
  const capture_date = new Date(image.capture_date_ms);

  const tint = colorHash.hex(slug);

  function PaginationButton(
    { className, slug, title, label }: PaginationButtonProps,
  ) {
    if (!slug) return null;

    const id = `id-${slug}`;

    return (
      <a href={slug} className={className} data-target={id} title={title}>
        <span>{label}</span>
      </a>
    );
  }

  return (
    <li
      className={cn("item", { target: matches })}
      id={id}
      key={slug}
      title={image.description}
      style={{ backgroundColor: tint }}
    >
      <img
        loading="lazy"
        src={imageUrl}
        width={image.width}
        height={image.height}
      />
      <span className="full">
        <span
          style={{
            backgroundImage: `url(${imageLink(image, 1280)})`,
          }}
        />
      </span>
      <a className="open" href={slug} data-target={id}>Open</a>
      <a className="close" href="/">Open</a>
      <PaginationButton
        className="previous"
        slug={previous}
        title="Go to previous photo"
        label="Previous"
      />{" "}
      <PaginationButton
        className="next"
        slug={next}
        title="Go to next photo"
        label="Next"
      />
      <ul className="links top photodetail-links">
        {
          /* <li className="caption">
          <span className="caption-text">{image.description}</span>
        </li>
        <li className="date">
          <code>
            <time dateTime={capture_date.toISOString()}>
              {capture_date.toLocaleDateString("en-IE")}
            </time>
          </code>
        </li> */
        }
        {env.ALLOW_IMAGE_SHARING == "1" && (
          <li class="share">
            <a
              onclick={`shareImage('${image.description}','${
                absoluteUrl(slug)
              }');`}
              title="Share this photo"
            >
              Share
            </a>
          </li>
        )}
        {env.ALLOW_ORIGINAL_DOWNLOAD == "1" && (
          <li class="download">
            <a
              href={imageUrl}
              download={imageName(image)}
              class=""
              title="Download this image"
            >
              Download
            </a>
          </li>
        )}
      </ul>

      <ul className="meta">
        {env.ALLOW_IMAGE_SHARING == "1" && (
          <li class="share">
            <a
              onclick={`shareImage('${image.description}','${
                absoluteUrl(slug)
              }');`}
              className="gridview-button share"
              title="Share this photo"
            >
              Share
            </a>
          </li>
        )}
        {env.ALLOW_ORIGINAL_DOWNLOAD == "1" && (
          <li class="download">
            <a
              href={imageUrl}
              download={imageName(image)}
              className="gridview-button download"
              title="Download this image"
            >
              Download
            </a>
          </li>
        )}
      </ul>
    </li>
  );
}

export function imageLink(image: ImageMedium["image"], width: number) {
  const url = new URL("https://" + image.responsive_url);
  url.searchParams.set("w", width.toString());

  return url.toString();
}

function imageName(image: ImageMedium["image"]) {
  return basename(image.responsive_url);
}
