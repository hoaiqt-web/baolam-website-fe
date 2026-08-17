const PROJECT_MEDIA_OBJECT_PATTERN = /^projects\/\d{4}\/(?:0[1-9]|1[0-2])\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(?:jpg|png|webp|avif)$/;

export function isProjectMediaObjectKey(value: string) {
  return PROJECT_MEDIA_OBJECT_PATTERN.test(value);
}

export function toProjectMediaUrl(objectKey: string) {
  if (!isProjectMediaObjectKey(objectKey)) {
    throw new Error("Project media object key không hợp lệ");
  }

  return `/media/${objectKey}`;
}

export function isProjectMediaUrl(value: string) {
  return value.startsWith("/media/") && isProjectMediaObjectKey(value.slice("/media/".length));
}
