'use client';

import { Moon, Sun } from 'lucide-react';

import { THEME_STORAGE_KEY } from '@/lib/theme';

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    root.classList.toggle('dark', next === 'dark');
    try { localStorage.setItem(THEME_STORAGE_KEY, next); } catch { /* Session-only when storage is blocked. */ }
  }

  return (
    <button type="button" onClick={toggle}
      className="theme-toggle inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-baolam-border bg-baolam-surface/60 text-baolam-text transition-colors hover:border-baolam-primary hover:text-baolam-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-baolam-primary">
      <Sun className="theme-to-light size-4" aria-hidden="true" />
      <Moon className="theme-to-dark size-4" aria-hidden="true" />
      <span className="theme-to-light sr-only">Chuyển sang giao diện sáng</span>
      <span className="theme-to-dark sr-only">Chuyển sang giao diện tối</span>
    </button>
  );
}
