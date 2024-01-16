import { closePhoto } from "../util/modal.ts";

export default function CloseButton() {
  function handleClick(e: Event) {
    e.preventDefault();
    closePhoto("/");
  }

  return <a className="close" onClick={handleClick} href="/">Open</a>;
}
