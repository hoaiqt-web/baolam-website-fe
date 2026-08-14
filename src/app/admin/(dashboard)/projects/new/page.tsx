import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectEditor } from "@/components/admin/project-editor";

export default function NewProjectPage() {
  return <main className="p-4 lg:p-8"><Link href="/admin" className="mb-6 inline-flex items-center gap-2 text-sm text-baolam-muted hover:text-baolam-primary"><ArrowLeft /> Danh sách dự án</Link><h1 className="mb-8 text-3xl font-bold">Tạo dự án</h1><ProjectEditor project={null} /></main>;
}
