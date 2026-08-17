"use client";

import { useActionState, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, LoaderCircle, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/image-upload";
import type { Project, ProjectBlock } from "@/db/schema";
import type { ProjectBlockInput, ProjectBlockType } from "@/features/projects/types";
import { saveProjectAction, type SaveProjectState } from "@/app/admin/(dashboard)/projects/actions";

type EditorProject = Project & { blocks: ProjectBlock[] };
type EditableBlock = ProjectBlockInput & { editorId: string };

const initialState: SaveProjectState = {};
const BLOCK_LABELS: Record<ProjectBlockType, string> = {
  highlights: "Dấu ấn dự án",
  imageText: "Ảnh + nội dung",
  gallery: "Thư viện ảnh",
  process: "Quy trình",
  technical: "Giải pháp kỹ thuật",
  testimonial: "Phản hồi khách hàng",
};

function emptyBlock(type: ProjectBlockType): EditableBlock {
  return {
    editorId: crypto.randomUUID(),
    type,
    isVisible: true,
    variant: type === "gallery" ? "mosaic" : "default",
    data: type === "process" ? { heading: "Quy trình sản xuất & lắp đặt", steps: [] }
      : type === "gallery" ? { heading: "Hình ảnh dự án", images: [] }
      : type === "testimonial" ? { heading: "Phản hồi từ khách hàng" }
      : {},
  };
}

function parseLines(value: string) {
  return value.split("\n");
}

export function ProjectEditor({ project }: { project: EditorProject | null }) {
  const action = useMemo(() => saveProjectAction.bind(null, project?.id ?? null), [project?.id]);
  const [state, formAction, pending] = useActionState(action, initialState);
  const [coverImage, setCoverImage] = useState(project?.coverImage ?? "");
  const [blocks, setBlocks] = useState<EditableBlock[]>(() => (project?.blocks ?? []).map((block) => ({
    id: block.id,
    editorId: block.id,
    type: block.type,
    variant: block.variant ?? undefined,
    isVisible: block.isVisible,
    data: block.data,
  })));

  function updateBlock(index: number, patch: Partial<EditableBlock>) {
    setBlocks((current) => current.map((block, blockIndex) => blockIndex === index ? { ...block, ...patch } : block));
  }

  function updateData(index: number, patch: Record<string, unknown>) {
    setBlocks((current) => current.map((block, blockIndex) => blockIndex === index ? { ...block, data: { ...block.data, ...patch } } : block));
  }

  function move(index: number, offset: -1 | 1) {
    const target = index + offset;
    if (target < 0 || target >= blocks.length) return;
    setBlocks((current) => {
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="blocks" value={JSON.stringify(blocks.map((block) => ({ id: block.id, type: block.type, variant: block.variant, isVisible: block.isVisible, data: block.data })))} />
      <input type="hidden" name="coverImage" value={coverImage} />

      <Card className="border-baolam-border bg-baolam-surface/65 text-white">
        <CardHeader><CardTitle>Thông tin dự án</CardTitle></CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <Field label="Tên dự án" name="title" defaultValue={project?.title} required />
          <Field label="Slug" name="slug" defaultValue={project?.slug} placeholder="thac-nuoc-tien-nu" required />
          <Field label="Nhãn đầu trang" name="eyebrow" defaultValue={project?.eyebrow ?? "Dự án công trình"} />
          <div className="space-y-2">
            <Label htmlFor="status">Trạng thái</Label>
            <select id="status" name="status" defaultValue={project?.status ?? "draft"} className="h-10 w-full rounded-lg border border-white/15 bg-[#071522] px-3 text-sm outline-none focus:border-baolam-primary">
              <option value="draft">Bản nháp</option><option value="published">Xuất bản</option><option value="archived">Lưu trữ</option>
            </select>
          </div>
          <Field label="Chủ đầu tư / khách hàng" name="client" defaultValue={project?.client ?? ""} />
          <Field label="Địa điểm" name="location" defaultValue={project?.location ?? ""} />
          <Field label="Danh mục" name="category" defaultValue={project?.category ?? ""} />
          <Field label="Năm hoàn thành" name="completionYear" type="number" defaultValue={project?.completionYear?.toString() ?? ""} />
          <Field label="Quy mô" name="scale" defaultValue={project?.scale ?? ""} />
          <Field label="Vật liệu" name="materials" defaultValue={project?.materials ?? ""} />
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="excerpt">Mô tả ngắn</Label>
            <Textarea id="excerpt" name="excerpt" defaultValue={project?.excerpt ?? ""} rows={3} />
          </div>
          <ImageUpload label="Ảnh cover" values={coverImage ? [coverImage] : []} onChange={(values) => setCoverImage(values[0] ?? "")} required />
          <div className="md:col-span-2"><Field label="Alt text ảnh cover" name="coverAlt" defaultValue={project?.coverAlt ?? ""} /></div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h2 className="text-xl font-bold">Nội dung trang detail</h2><p className="text-sm text-baolam-muted">Thêm và sắp xếp các section theo từng dự án.</p></div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(BLOCK_LABELS) as ProjectBlockType[]).map((type) => (
            <Button key={type} type="button" variant="outline" className="border-white/15 bg-transparent text-white hover:border-baolam-primary hover:bg-baolam-primary/10" onClick={() => setBlocks((current) => [...current, emptyBlock(type)])}>
              <Plus /> {BLOCK_LABELS[type]}
            </Button>
          ))}
        </div>
      </div>

      {blocks.length === 0 && <div className="rounded-xl border border-dashed border-baolam-primary/30 p-12 text-center text-baolam-muted">Chưa có section. Chọn một block phía trên để bắt đầu.</div>}

      {blocks.map((block, index) => (
        <Card key={block.editorId} className={`border-baolam-border bg-[#0b1c2e] text-white ${block.isVisible ? "" : "opacity-55"}`}>
          <CardHeader className="flex-row items-center justify-between gap-3">
            <div><span className="text-xs font-bold tracking-widest text-baolam-primary">SECTION {String(index + 1).padStart(2, "0")}</span><CardTitle className="mt-1 text-lg">{BLOCK_LABELS[block.type]}</CardTitle></div>
            <div className="flex gap-1">
              <Button type="button" variant="ghost" size="icon" onClick={() => move(index, -1)} disabled={index === 0}><ArrowUp /></Button>
              <Button type="button" variant="ghost" size="icon" onClick={() => move(index, 1)} disabled={index === blocks.length - 1}><ArrowDown /></Button>
              <Button type="button" variant="ghost" size="icon" onClick={() => updateBlock(index, { isVisible: !block.isVisible })}>{block.isVisible ? <Eye /> : <EyeOff />}</Button>
              <Button type="button" variant="destructive" size="icon" onClick={() => setBlocks((current) => current.filter((_, blockIndex) => blockIndex !== index))}><Trash2 /></Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <BlockFields block={block} onData={(patch) => updateData(index, patch)} onVariant={(variant) => updateBlock(index, { variant })} />
          </CardContent>
        </Card>
      ))}

      <Card className="border-baolam-border bg-baolam-surface/65 text-white">
        <CardHeader><CardTitle>SEO</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <Field label="SEO title" name="seoTitle" defaultValue={project?.seoTitle ?? ""} />
          <div className="space-y-2"><Label htmlFor="seoDescription">SEO description</Label><Textarea id="seoDescription" name="seoDescription" defaultValue={project?.seoDescription ?? ""} rows={3} /></div>
        </CardContent>
      </Card>

      {state.errors?.length ? <div className="rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200"><ul className="list-disc space-y-1 pl-5">{state.errors.map((error) => <li key={error}>{error}</li>)}</ul></div> : null}
      {state.success && <p className="rounded-lg border border-green-400/30 bg-green-500/10 p-4 text-sm text-green-200">{state.message}</p>}

      <div className="sticky bottom-4 flex justify-end rounded-xl border border-baolam-border bg-[#06111e]/95 p-3 shadow-2xl backdrop-blur">
        <Button type="submit" size="lg" disabled={pending} className="bg-baolam-primary text-baolam-bg hover:bg-baolam-primary-hover">
          {pending ? <LoaderCircle className="animate-spin" /> : <Save />} {pending ? "Đang lưu" : "Lưu dự án"}
        </Button>
      </div>
    </form>
  );
}

function Field({ label, name, ...props }: React.ComponentProps<typeof Input> & { label: string; name: string }) {
  return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><Input id={name} name={name} {...props} /></div>;
}

function BlockFields({ block, onData, onVariant }: { block: EditableBlock; onData: (patch: Record<string, unknown>) => void; onVariant: (value: string) => void }) {
  const data = block.data;
  if (block.type === "gallery") return <>
    <BlockText label="Tiêu đề" value={data.heading} onChange={(heading) => onData({ heading })} />
    <div className="space-y-2"><Label>Kiểu gallery</Label><select value={block.variant} onChange={(event) => onVariant(event.target.value)} className="h-10 w-full rounded-lg border border-white/15 bg-baolam-bg px-3"><option value="mosaic">Mosaic</option><option value="grid">Grid</option><option value="cinematic">Cinematic</option></select></div>
    <ImageUpload label="Ảnh gallery" values={(data.images ?? []).map((image) => image.url)} multiple onChange={(values) => onData({ images: values.map((url) => data.images?.find((image) => image.url === url) ?? { url }) })} />
  </>;

  if (block.type === "process") return <>
    <BlockText label="Tiêu đề" value={data.heading} onChange={(heading) => onData({ heading })} />
    <div className="space-y-4 md:col-span-2">
      <Label>Các bước thực hiện</Label>
      {(data.steps ?? []).map((step, stepIndex) => <div key={stepIndex} className="grid gap-4 rounded-lg border border-white/10 bg-black/15 p-4 md:grid-cols-2">
        <BlockText label={`Bước ${stepIndex + 1}`} value={step.title} onChange={(title) => onData({ steps: data.steps?.map((item, index) => index === stepIndex ? { ...item, title } : item) })} />
        <div className="flex items-end justify-end"><Button type="button" variant="destructive" onClick={() => onData({ steps: data.steps?.filter((_, index) => index !== stepIndex) })}><Trash2 /> Xóa bước</Button></div>
        <div className="space-y-2 md:col-span-2"><Label>Mô tả</Label><Textarea rows={3} value={step.description ?? ""} onChange={(event) => onData({ steps: data.steps?.map((item, index) => index === stepIndex ? { ...item, description: event.target.value } : item) })} /></div>
        <ImageUpload label="Ảnh của bước" values={step.image ? [step.image] : []} onChange={(values) => onData({ steps: data.steps?.map((item, index) => index === stepIndex ? { ...item, image: values[0] } : item) })} />
      </div>)}
      <Button type="button" variant="outline" className="border-white/15 bg-transparent text-white" onClick={() => onData({ steps: [...(data.steps ?? []), { title: `Bước ${(data.steps?.length ?? 0) + 1}` }] })}><Plus /> Thêm bước</Button>
    </div>
  </>;

  if (block.type === "testimonial") return <>
    <div className="space-y-2 md:col-span-2"><Label>Trích dẫn</Label><Textarea rows={5} value={data.quote ?? ""} onChange={(event) => onData({ quote: event.target.value })} /></div>
    <BlockText label="Người phản hồi" value={data.author} onChange={(author) => onData({ author })} />
  </>;

  return <>
    <BlockText label="Tiêu đề" value={data.heading} onChange={(heading) => onData({ heading })} />
    {(block.type === "imageText" || block.type === "technical") && <ImageUpload label="Ảnh" values={data.image ? [data.image] : []} onChange={(values) => onData({ image: values[0] })} />}
    <div className="space-y-2 md:col-span-2"><Label>Nội dung</Label><Textarea rows={5} value={data.body ?? ""} onChange={(event) => onData({ body: event.target.value })} /></div>
    {(block.type === "highlights" || block.type === "technical") && <div className="space-y-2 md:col-span-2"><Label>Các ý nổi bật — mỗi dòng một ý</Label><Textarea rows={5} value={(data.items ?? []).join("\n")} onChange={(event) => onData({ items: parseLines(event.target.value) })} /></div>}
  </>;
}

function BlockText({ label, value, onChange }: { label: string; value?: string; onChange: (value: string) => void }) {
  return <div className="space-y-2"><Label>{label}</Label><Input value={value ?? ""} onChange={(event) => onChange(event.target.value)} /></div>;
}
