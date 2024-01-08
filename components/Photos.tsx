import { ImageMedium } from "vsco-api";
import { Photo } from "./Photo.tsx";

interface PhotosProps {
  images: ImageMedium[];
  url: URL;
}

export function Photos({ images, url }: PhotosProps) {
  return (
    <ul className="grid">
      {images.map((image, index) => {
        const matches = url.pathname === `/${image.image._id}`;

        return (
          <Photo
            matches={matches}
            image={image.image}
            next={images[index + 1]?.image._id}
            previous={images[index - 1]?.image._id}
          />
        );
      })}
    </ul>
  );
}
