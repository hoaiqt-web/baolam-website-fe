ALTER TABLE "contact_requests" ADD COLUMN "is_read" boolean DEFAULT false NOT NULL;--> statement-breakpoint
CREATE INDEX "contact_requests_is_read_idx" ON "contact_requests" USING btree ("is_read");