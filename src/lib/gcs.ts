import "server-only";

import { Storage } from "@google-cloud/storage";
import { z } from "zod";

let storage: Storage | undefined;

const serviceAccountSchema = z.object({
  project_id: z.string().min(1),
  client_email: z.email(),
  private_key: z.string().min(1),
});

function getServiceAccount() {
  const serviceAccountJson = process.env.GCP_SERVICE_ACCOUNT_JSON;

  if (!serviceAccountJson) {
    throw new Error("Thiếu GCP_SERVICE_ACCOUNT_JSON");
  }

  try {
    const parsed = serviceAccountSchema.parse(JSON.parse(serviceAccountJson));
    return {
      projectId: parsed.project_id,
      clientEmail: parsed.client_email,
      privateKey: parsed.private_key.replace(/\\n/g, "\n"),
    };
  } catch {
    throw new Error("GCP_SERVICE_ACCOUNT_JSON không phải service-account JSON hợp lệ");
  }
}

export function getGcsBucket() {
  const bucketName = process.env.GCS_BUCKET_NAME;
  const serviceAccount = getServiceAccount();

  if (!bucketName) throw new Error("Thiếu GCS_BUCKET_NAME");

  storage ??= new Storage({
    projectId: serviceAccount.projectId,
    credentials: {
      client_email: serviceAccount.clientEmail,
      private_key: serviceAccount.privateKey,
    },
  });

  return storage.bucket(bucketName);
}
