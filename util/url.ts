export function absoluteUrl(path: string, url: string) {
  return new URL(path, url).toString();
}
