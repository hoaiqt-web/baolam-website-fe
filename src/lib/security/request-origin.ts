function firstForwardedValue(value: string | null) {
  return value?.split(",")[0]?.trim();
}

export function hasValidRequestOrigin(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return false;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  const requestUrl = new URL(request.url);
  const host = firstForwardedValue(request.headers.get("x-forwarded-host"))
    ?? request.headers.get("host")
    ?? requestUrl.host;
  const protocol = firstForwardedValue(request.headers.get("x-forwarded-proto"))
    ?? requestUrl.protocol.replace(":", "");

  return origin === `${protocol}://${host}`;
}
