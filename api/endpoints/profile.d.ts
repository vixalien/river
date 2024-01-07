export interface Profile {
  sites: Site[];
}

export interface Site {
  collection_share_link: string;
  description: string;
  domain: string;
  externalLink: string;
  externalLinkDisplayText: string;
  grid_album_id: string;
  has_grid: boolean;
  id: number;
  is_brand: boolean;
  internal_site: boolean;
  museum: boolean;
  name: string;
  password: null;
  profile_image: string;
  profile_image_id: string;
  recently_published: string;
  responsive_url: string;
  share_link: string;
  site_collection_id: string;
  status: "published";
  subdomain: number;
  type: number;
  user_id: number;
  site_title: string;
  template: {
    name: number;
  };
  links: Record<string, never>;
}
