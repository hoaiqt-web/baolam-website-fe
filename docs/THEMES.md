# Website themes

The public website defaults to the existing dark appearance. The header's sun/moon button switches between dark and light, including on mobile. The preference is stored under `baolam-theme` in localStorage. An inline script in the root layout restores it before paint; storage failures fall back to dark on reload while the button still works for the current page.

Light uses ivory backgrounds, navy text and teal accents. Existing layouts, CMS content and photography are shared between modes. Photo heroes, photo overlays and image viewers retain dark contrast. The CMS admin keeps its existing palette independently of the public preference.

## Adding a block

- Use `bg-canvas`, `bg-baolam-surface`, `text-ink`, `text-baolam-muted` and `border-baolam-border` instead of hard-coded dark colors or white text.
- Use `text-primary-foreground` for labels on primary buttons.
- Low-emphasis labels can use `text-subtle-30`, `text-subtle-40`, `text-subtle-50` or `text-subtle-55`. These preserve existing dark opacity and provide stronger light contrast.
- Apply `theme-media` only to a photographic region that needs light text in both modes, not to the surrounding section's descriptions.
- Theme variables live in `src/app/globals.css`; preference initialization lives in `src/lib/theme.ts`.

## Verification

Check both modes on home, capabilities, artwork, factory, projects, contact and legal pages. Verify header/mobile navigation, photo captions, contact modal, reload persistence and switching with storage blocked. Admin should remain readable after choosing light on the public site. No database migration is needed for themes.
