"use client";

import { useActionState, useEffect } from "react";
import { LoaderCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast-provider";
import type { PublicSiteSettings } from "@/data/site-settings-defaults";
import { saveSiteSettingsAction, type SaveSiteSettingsState } from "@/app/admin/(dashboard)/settings/actions";

const initialState: SaveSiteSettingsState = {};

export function SiteSettingsForm({ settings }: { settings: PublicSiteSettings }) {
  const { toast } = useToast();
  const [state, formAction, pending] = useActionState(saveSiteSettingsAction, initialState);

  useEffect(() => {
    if (state.success) toast({ title: state.message || "Đã lưu.", variant: "success" });
    if (state.errors?.length) toast({ title: "Không thể lưu", description: state.errors.join(" · "), variant: "error" });
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-6">
      <Card className="border-baolam-border bg-baolam-surface/65 text-white">
        <CardHeader><CardTitle>Liên hệ</CardTitle></CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <Field label="Email" name="contactEmail" type="email" defaultValue={settings.contactEmail} />
          <Field label="Hotline" name="contactPhone" defaultValue={settings.contactPhone} />
          <div className="md:col-span-2">
            <Field label="Địa chỉ" name="officeAddress" defaultValue={settings.officeAddress} />
          </div>
          <Field label="Giờ làm việc" name="workingHours" defaultValue={settings.workingHours} />
        </CardContent>
      </Card>

      <Card className="border-baolam-border bg-baolam-surface/65 text-white">
        <CardHeader><CardTitle>Liên kết</CardTitle></CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <Field label="Google Maps" name="googleMapsUrl" defaultValue={settings.googleMapsUrl} placeholder="https://maps.google.com/..." />
          <Field label="Facebook" name="facebookUrl" defaultValue={settings.facebookUrl} placeholder="https://facebook.com/..." />
        </CardContent>
      </Card>

      <div className="sticky bottom-4 flex justify-end rounded-xl border border-baolam-border bg-[#06111e]/95 p-3 shadow-2xl backdrop-blur">
        <Button type="submit" size="lg" disabled={pending} className="bg-baolam-primary text-baolam-bg hover:bg-baolam-primary-hover">
          {pending ? <LoaderCircle className="animate-spin" /> : <Save />} {pending ? "Đang lưu" : "Lưu thông tin"}
        </Button>
      </div>
    </form>
  );
}

function Field({ label, name, ...props }: React.ComponentProps<typeof Input> & { label: string; name: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} {...props} />
    </div>
  );
}
