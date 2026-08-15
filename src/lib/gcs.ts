import "server-only";

import { Storage } from "@google-cloud/storage";

let storage: Storage | undefined;

export function getGcsBucket() {
  const projectId = process.env.GCS_PROJECT_ID;
  const clientEmail = process.env.GCS_CLIENT_EMAIL;
  const privateKey = process.env.GCS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const bucketName = process.env.GCS_BUCKET_NAME;

  if (!projectId || !clientEmail || !privateKey || !bucketName) {
    throw new Error("Thiếu cấu hình GCS_PROJECT_ID, GCS_CLIENT_EMAIL, GCS_PRIVATE_KEY hoặc GCS_BUCKET_NAME");
  }

  storage ??= new Storage({
    projectId,
    credentials: { client_email: clientEmail, private_key: privateKey },
  });

  return storage.bucket(bucketName);
}
