import { request } from "../util/request.ts";
import { ProfileMedia } from "./media.d.ts";

export interface Pagination {
  limit?: number;
  cursor?: string;
}

export function getProfileMedia(site_id: number, pagination: Pagination = {}) {
  const { limit = 14, cursor = "" } = pagination;

  return request<ProfileMedia>(`3.0/medias/profile`, {
    query: {
      site_id: site_id.toString(),
      limit: limit.toString(),
      cursor: cursor,
    },
  });
}
