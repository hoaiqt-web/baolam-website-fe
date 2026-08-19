function firstForwardedValue(value: string | null) {
  return value?.split(",")[0]?.trim();
}

/**
 * Behind Railway's reverse proxy, `request.url` reflects the internal
 * bind address (e.g. http://0.0.0.0:8080/...), not the public domain the
 * browser actually requested. Any absolute URL built from it — redirects
 * in particular — must use the forwarded host/proto instead.
 */
export function getPublicOrigin(request: Request) {
  const requestUrl = new URL(request.url);
  const host = firstForwardedValue(request.headers.get("x-forwarded-host"))
    ?? request.headers.get("host")
    ?? requestUrl.host;
  const protocol = firstForwardedValue(request.headers.get("x-forwarded-proto"))
    ?? requestUrl.protocol.replace(":", "");

  return `${protocol}://${host}`;
}

export function hasValidRequestOrigin(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return false;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  return origin === getPublicOrigin(request);
}
