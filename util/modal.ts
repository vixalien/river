import { TARGET_CLASS } from "./constants.ts";

function removeTargetClass  ()  {
  const targets = document.querySelectorAll(`.${TARGET_CLASS}`);
  targets.forEach((target) => {
    target.classList.remove(TARGET_CLASS);
  });
};

export function openPhoto(id: string, href?: string) {
  const photo = document.getElementById(id) as HTMLLIElement;
  const phototitle = photo.getAttribute("title") ?? "";
  removeTargetClass();
  photo.classList.add(TARGET_CLASS);
  document.title = phototitle;
  if (href) {
    window.history.pushState({ id: id }, "", href);
  }
}

export function closePhoto(href?: string) {
  const title = document.querySelector("head title")!.getAttribute(
    "data-title",
  )!;
  removeTargetClass();
  document.title = title;
  if (href) {
    window.history.pushState({}, "", href);
  }
}
