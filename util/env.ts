// This code should only be seen in the browser

if (!("Deno" in window)) {
  throw new Error("This code should only be seen in the browser");
}

export const env = Deno.env.toObject();

export function absoluteUrl(path: string) {
  return new URL(path, env.URL!).toString();
}
