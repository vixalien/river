import { APIError } from "./error.ts";
import { __settings } from "./settings.ts";

interface RequestMeta {
  method?: string;
  query?: Record<string, string>;
}

export async function request<T = unknown>(
  endpoint: string,
  meta: RequestMeta = {},
) {
  if (!__settings.token) {
    throw new APIError("Token not set");
  }

  const url = new URL(__settings.baseUrl + endpoint);

  if (meta.query) {
    url.search = new URLSearchParams(meta.query).toString();
  }

  const response = await fetch(url, {
    method: meta.method || "GET",
    headers: {
      Authorization: `Bearer ${__settings.token}`,
    },
  });

  if (!response.ok) {
    throw new APIError(`Request failed with status ${response.status}`);
  }

  return response.json() as T;
}
