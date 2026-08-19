CREATE TABLE "site_settings" (
	"id" varchar(40) PRIMARY KEY DEFAULT 'default' NOT NULL,
	"contact_email" varchar(255),
	"contact_phone" varchar(50),
	"office_address" text,
	"working_hours" varchar(160),
	"google_maps_url" text,
	"zalo_url" text,
	"facebook_url" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
