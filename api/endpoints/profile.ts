import { request } from "../util/request.ts";
import { Profile } from "./profile.d.ts";

/**
 * Get the profile information of a user
 * @param username the username of the profile to get
 * @returns
 */
export function getProfile(username: string) {
  return request<Profile>(`2.0/sites`, {
    query: {
      subdomain: username,
      include_sub_status: "true",
    },
  });
}
