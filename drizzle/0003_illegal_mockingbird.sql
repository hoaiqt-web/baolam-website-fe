CREATE TYPE "public"."contact_request_status" AS ENUM('new', 'contacted', 'closed');--> statement-breakpoint
CREATE TYPE "public"."contact_request_type" AS ENUM('quick', 'project_brief');--> statement-breakpoint
CREATE TABLE "contact_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "contact_request_type" NOT NULL,
	"status" "contact_request_status" DEFAULT 'new' NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"email" varchar(255),
	"company" varchar(255),
	"project_name" varchar(255),
	"location" varchar(255),
	"project_type" varchar(120),
	"scale" varchar(120),
	"stage" varchar(120),
	"scopes" jsonb,
	"message" text,
	"attachments" jsonb,
	"source" varchar(120),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "contact_requests_status_idx" ON "contact_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "contact_requests_created_at_idx" ON "contact_requests" USING btree ("created_at");