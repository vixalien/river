import { openPhoto } from "../util/modal.ts";

export interface OpenButtonProps {
  id: string;
  href: string;
}

export default function OpenButton({ id, href }: OpenButtonProps) {
  function handleClick(e: Event) {
    e.preventDefault();
    openPhoto(id, href);
  }

  return <a className="open" onClick={handleClick} href={href}>Open</a>;
}
