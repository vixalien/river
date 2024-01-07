export interface Settings {
  baseUrl: string;
  token: string;
}

const settings: Settings = {
  /** vsco APIs are weird!! */
  baseUrl: "https://vsco.co/api/",
  token: "",
};

export function setToken(token: string) {
  settings.token = token;
}

export const __settings = settings;
