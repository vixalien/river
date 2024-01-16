import { useEnv } from "../islands/EnvContext.tsx";
import { absoluteUrl } from "../util/url.ts";

export interface ShareButtonProps {
  text: string;
  slug: string;
  className?: string;
}

export default function ShareButton(
  { text, slug, className }: ShareButtonProps,
) {
  const env = useEnv();

  function handleClick(e: Event) {
    e.preventDefault();
    shareImage(text, absoluteUrl(slug, env.URL));
  }

  return (
    <li class="share">
      <a
        onClick={handleClick}
        className={className}
        title="Share this photo"
      >
        Share
      </a>
    </li>
  );
}

function shareImage(title: string, url: string) {
  if (navigator.canShare?.()) {
    const shareData = {
      title: title,
      url: url,
    };
    navigator.share(shareData);
  } else {
    navigator.clipboard.writeText(url);

    // @ts-expect-error Toastify will be imported later
    Toastify({
      text: "Copied to clipboard",
      duration: 3000,
      style: {
        background: "rgba(0, 0, 0, 0.7)",
      },
    }).showToast();
  }
}
