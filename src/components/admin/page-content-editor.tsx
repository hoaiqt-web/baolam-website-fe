'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUpload } from './image-upload';
import type { CmsDocument, CmsField, CmsPage } from '@/features/page-content/types';

type State = { draft: CmsDocument; version: number; publishedAt: string | null; revisions: { id: string; version: number; createdAt: string }[] };
const inputClass = 'w-full rounded-lg border border-white/15 bg-[#071522] px-3 py-2.5 text-sm text-white outline-none focus:border-baolam-primary';
export function PageContentEditor({ page, initial }: { page: CmsPage; initial: State }) {
  const router = useRouter();
  const [content, setContent] = useState(initial.draft);
  const [saved, setSaved] = useState(initial.draft);
  const [version, setVersion] = useState(initial.version);
  const [selected, setSelected] = useState(page.blocks[0]?.id ?? '');
  const [search, setSearch] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [publishConfirm, setPublishConfirm] = useState(false);
  const dirty = JSON.stringify(content) !== JSON.stringify(saved);
  useEffect(() => {
    function beforeUnload(event: BeforeUnloadEvent) { if (dirty) event.preventDefault(); }
    window.addEventListener('beforeunload', beforeUnload);
    return () => window.removeEventListener('beforeunload', beforeUnload);
  }, [dirty]);
  const block = page.blocks.find(item => item.id === selected);
  const fields = block?.fields.filter(field => !search || `${field.label} ${content[field.id] ?? field.defaultValue}`.toLocaleLowerCase('vi').includes(search.toLocaleLowerCase('vi'))) ?? [];
  function change(field: CmsField, value: string) { setContent(previous => ({ ...previous, [field.id]: value })); setMessage(''); }
  async function submit(action: 'save' | 'publish' | 'restore', revisionId?: string): Promise<boolean> {
    setBusy(true); setError(''); setMessage('');
    try {
      const response = await fetch(`/api/admin/pages/${page.id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action, content, version, revisionId }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Không thể lưu nội dung.');
      setContent(result.content); setSaved(result.content); setVersion(result.version);
      setMessage(action === 'publish' ? 'Đã xuất bản. Nội dung mới đã hiển thị trên website.' : action === 'restore' ? 'Đã khôi phục vào bản nháp. Xem trước rồi xuất bản khi sẵn sàng.' : 'Đã lưu bản nháp. Website công khai chưa thay đổi.');
      setPublishConfirm(false); router.refresh(); return true;
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Không thể lưu nội dung.'); return false; }
    finally { setBusy(false); }
  }
  async function preview() {
    const tab = window.open('about:blank', '_blank');
    if (dirty && !(await submit('save'))) { tab?.close(); return; }
    const url = `/api/admin/pages/preview?page=${page.id}`;
    if (tab) { tab.opener = null; tab.location.href = url; } else window.location.href = url;
  }
  return <main className="mx-auto max-w-7xl p-4 lg:p-8">
    <Link href="/admin/pages" onClick={event => { if (dirty && !window.confirm('Bạn có thay đổi chưa lưu. Rời trang?')) event.preventDefault(); }} className="text-sm text-baolam-muted hover:text-white">← Các trang</Link>
    <div className="sticky top-0 z-20 -mx-4 mt-3 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-[#06111e]/95 px-4 py-4 backdrop-blur">
      <div><h1 className="text-2xl font-bold">{page.label}</h1><p className="mt-1 text-xs text-baolam-muted">{dirty ? 'Có thay đổi chưa lưu' : 'Bản nháp đã lưu'} · Phiên bản {version}</p></div>
      <div className="flex flex-wrap gap-2"><button disabled={busy} onClick={() => void submit('save')} className="rounded-lg border border-white/20 px-4 py-2 text-sm disabled:opacity-40">Lưu nháp</button><button disabled={busy} onClick={() => void preview()} className="rounded-lg border border-white/20 px-4 py-2 text-sm disabled:opacity-40">Xem trước</button><button disabled={busy} onClick={() => setPublishConfirm(true)} className="rounded-lg bg-baolam-primary px-4 py-2 text-sm font-bold text-slate-950 disabled:opacity-40">Xuất bản</button></div>
    </div>
    {message && <p role="status" className="mt-4 rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-200">{message}</p>}
    {error && <p role="alert" className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
    {publishConfirm && <div className="mt-4 rounded-xl border border-baolam-primary/40 bg-white/5 p-4"><p className="text-sm">Xuất bản toàn bộ thay đổi của “{page.label}” lên website?</p><div className="mt-3 flex gap-3"><button disabled={busy} onClick={() => void submit('publish')} className="rounded bg-baolam-primary px-4 py-2 text-sm font-bold text-slate-950">{busy ? 'Đang lưu…' : 'Xác nhận xuất bản'}</button><button disabled={busy} onClick={() => setPublishConfirm(false)} className="px-4 py-2 text-sm">Hủy</button></div></div>}
    <div className="mt-6 grid items-start gap-6 lg:grid-cols-[250px_1fr]">
      <aside className="space-y-4 lg:sticky lg:top-28"><nav aria-label="Các khối nội dung" className="max-h-[50vh] overflow-auto rounded-xl border border-white/10 p-2 lg:max-h-[65vh]">{page.blocks.map((item, index) => <button key={item.id} onClick={() => { setSelected(item.id); setSearch(''); }} className={`block w-full rounded-lg px-3 py-3 text-left text-sm ${selected === item.id ? 'bg-baolam-primary/10 text-baolam-primary' : 'text-baolam-muted hover:bg-white/5'}`}><span className="mr-2 opacity-50">{String(index + 1).padStart(2, '0')}</span>{item.label}</button>)}</nav>
      <details className="rounded-xl border border-white/10 p-4"><summary className="cursor-pointer text-sm font-semibold">Lịch sử xuất bản</summary><div className="mt-3 space-y-3">{initial.revisions.length ? initial.revisions.map(revision => <div key={revision.id} className="border-t border-white/10 pt-3 text-xs"><p>Phiên bản {revision.version}</p><p className="my-1 text-baolam-muted">{new Date(revision.createdAt).toLocaleString('vi-VN')}</p><button disabled={busy} onClick={() => { if (window.confirm('Khôi phục phiên bản này vào bản nháp? Các thay đổi chưa lưu sẽ bị thay thế.')) void submit('restore', revision.id); }} className="text-baolam-primary">Khôi phục vào nháp</button></div>) : <p className="text-xs text-baolam-muted">Chưa có phiên bản xuất bản.</p>}</div></details></aside>
      <section className="min-w-0 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-6"><h2 className="text-xl font-semibold">{block?.label}</h2><p className="mt-2 text-xs leading-5 text-baolam-muted">Sửa nội dung ở các vị trí hiện có. Nút ↺ khôi phục nội dung ban đầu của trường.</p><input aria-label="Tìm nội dung trong khối" placeholder="Tìm text hoặc ảnh…" value={search} onChange={event => setSearch(event.target.value)} className={`${inputClass} my-5`} />
      <fieldset disabled={busy} className="space-y-6 disabled:opacity-60">{fields.map((field, index) => <div key={field.id} className="border-t border-white/10 pt-5"><div className="mb-2 flex items-start justify-between gap-3"><label htmlFor={field.id} className="text-sm font-semibold">{field.label}{field.kind !== 'image' && <span className="ml-2 text-xs font-normal text-baolam-muted">{index + 1}</span>}</label><button type="button" title="Khôi phục nội dung ban đầu" aria-label={`Khôi phục ${field.label}`} onClick={() => setContent(previous => { const next = { ...previous }; delete next[field.id]; return next; })} className="text-baolam-primary">↺</button></div>
      {field.kind === 'image' ? <><ImageUpload label={field.label} values={(content[field.id] ?? field.defaultValue) ? [content[field.id] ?? field.defaultValue] : []} onChange={values => change(field, values[0] ?? '')} /><input id={field.id} aria-label={`Đường dẫn ${field.label}`} placeholder="Hoặc dán đường dẫn ảnh" value={content[field.id] ?? field.defaultValue} onChange={event => change(field, event.target.value)} className={`${inputClass} mt-3`} /></> : field.kind === 'link' ? <input id={field.id} value={content[field.id] ?? field.defaultValue} onChange={event => change(field, event.target.value)} className={inputClass} /> : <textarea id={field.id} rows={(content[field.id] ?? field.defaultValue).length > 140 ? 4 : 2} value={content[field.id] ?? field.defaultValue} onChange={event => change(field, event.target.value)} className={`${inputClass} resize-y`} />}
      </div>)}{!fields.length && <p className="py-6 text-sm text-baolam-muted">Không có nội dung phù hợp.</p>}</fieldset></section>
    </div>
  </main>;
}
