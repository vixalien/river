import { openPhoto } from "../util/modal.ts";

export interface PaginationButtonProps {
  className: string;
  title: string;
  slug?: string;
  label: string;
}

export default function PaginationButton(
  { className, slug, title, label }: PaginationButtonProps,
) {
  if (!slug) return null;

  const id = `id-${slug}`;

  function handleClick(e: Event) {
    e.preventDefault();
    openPhoto(id, slug);
  }

  return (
    <a href={slug} className={className} title={title} onClick={handleClick}>
      <span>{label}</span>
    </a>
  );
}
