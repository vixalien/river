import cn from "https://esm.sh/classnames@2.5.1";
import ColorHash from "color-hash";

import { ImageMedium } from "vsco-api";

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
        src={imageLink(image, 480)}
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
    </li>
  );
}

function imageLink(image: ImageMedium["image"], width: number) {
  const url = new URL("https://" + image.responsive_url);
  url.searchParams.set("w", width.toString());

  return url.toString();
}
