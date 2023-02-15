import isInternalUrl from "@docusaurus/isInternalUrl";

export const ensureTrailingSlash = (url: string) =>
  isInternalUrl(url) && !url.endsWith("/") ? `${url}/` : url
