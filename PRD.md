# Rotion — Product Requirements Document (Reverse-Engineered)

## Executive Summary

Rotion is a desktop-first document/workspace management application built with Electron, React and TypeScript. It provides a lightweight workspace UI with a persistent sidebar (projects/pages), a command-style search palette, breadcrumbs and document area. The app targets single-user local workflows where documents/pages are created, browsed and organized within a workspace window.

## Target Audience (Likely Personas)

- End User / Individual Creator: people who want a local document workspace for notes or small projects.
- Power User: keyboard-first users who rely on quick search (command palette) and fast navigation.
- Developer / Technical Reader: because of the app's tooling and UI choices, developers will find it familiar and extensible.

## Core Features (Observed)

- Workspace Sidebar
  - Persistent list of pages/documents grouped into sections ("Workspace").
  - Profile area and quick-create action (`Create new page`).
  - Context actions per item (three-dots menu UI present).
- Header + Breadcrumbs
  - Breadcrumb trail showing document location and active item.
  - Inline actions (e.g., delete button in header).
- Command Palette / Global Search
  - Modal command-style search using `cmdk` with keyboard shortcut (Meta/⌘+K).
  - Search results include document items and quick selection.
- Document Area
  - Main content area where a selected document/page is shown (placeholder page present).
- Create Page flow (UI button exists; actual creation logic not present in inspected files).
- External Links Handling
  - Links opened from web content are routed to external browser via `shell.openExternal`.

Not implemented / not observed (gaps)
- No authentication or multi-user features.
- No visible persistence layer (no filesystem or DB calls in inspected renderer code).
- No explicit document editor component (blank placeholder only).

## Technical Architecture

**High-level:** Electron app with three primary layers: Main (Electron main process), Preload (context bridge + toolkit), Renderer (React SPA). Build and dev powered by `electron-vite` and packaging via `electron-builder`.

### Electron (layers, config, structure)

- Configuration: `electron.vite.config.ts` defines `main`, `preload` and `renderer` build targets. Plugins used:
  - `externalizeDepsPlugin()` for main/preload to externalize dependencies.
  - `@vitejs/plugin-react` and `@tailwindcss/vite` in renderer.
  - Alias `@renderer` → `src/renderer/src` for easier imports.
- Entrypoints:
  - Main process: `src/main/index.ts` — creates `BrowserWindow`, registers routes (`registerRoute`) and configures how renderer is loaded (dev server vs built `index.html`).
  - Preload: `src/preload/index.ts` — exposes `electronAPI` from `@electron-toolkit/preload` and a small `api` object on `window` (via `contextBridge` when isolation is enabled).
  - Renderer: `src/renderer/src/main.tsx` renders the React `App`.
- Window routing: Uses `electron-router-dom` helper to create named routes (`ids: ['main']`) and `registerRoute({ id: 'main', browserWindow, htmlFile })` from main. Renderer-side uses `Router` from the same `electron-router-dom` lib to mount routes under the corresponding basename (`/main/`).
- Platform specifics: MacOS dock icon and traffic light positioning handled in main; different UI tweaks (title bar region, region-drag) for macOS vs other platforms.

### Backend (main process: Node.js runtime, middleware, API structure)

- Node/Electron runtime: `electron` dependency is pinned to `^38.1.2` (see `package.json`). The Node.js runtime is the one that ships with that Electron release (consult Electron release notes to map to the exact Node version).
- IPC & API surface:
  - `ipcMain.on('ping', ...)` example exists in main — indicates use of IPC channels for main ↔ renderer communication.
  - Preload exposes `electronAPI` (from `@electron-toolkit/preload`) under `window.electron`, and a custom `window.api` object placeholder. Renderer code can call those APIs; reverse flow is supported via `ipcMain` listeners.
  - `registerRoute` (electron-router-dom) acts as a mapping between renderer routes and BrowserWindow instances (multi-window support-ready).
- Middleware: No Express or HTTP middlewares observed — the app does not include a traditional HTTP backend; main acts as the Node environment for native capabilities and IPC.

### Frontend (React, UI libs, routing)

- React & Tooling:
  - `react` and `react-dom` at `^19.1.x` (concurrent/react 19).
  - TypeScript (TS `^5.9.2`) and `vite` for dev/build via `electron-vite`.
- Routing:
  - `react-router-dom` dependency is present (v7.x). Routing is wrapped by `electron-router-dom`'s `Router` which mounts a `Route` tree with `main` basename.
- UI & libraries:
  - `tailwindcss` (v4) used for styling; a Tailwind plugin is included for the Vite pipeline.
  - `cmdk` for command-palette UI.
  - `phosphor-react` for icons.
  - `clsx` for className composition.
- Component structure (observed):
  - `App` composes `Sidebar`, `Header`, and `Routes`.
  - `Sidebar` contains `Profile`, `Search`, `Navigation` (with `Section`, `Link`, `SectionContent`), `CreatePage`.
  - `Header` contains `Breadcrumbs` and header actions.

## Data Flow (how frontend communicates with backend)

- Renderer → Main:
  - Via `window.electron` (toolkit-provided `electronAPI`) and custom `window.api` exposed by preload. Example IPC channel: `ipcMain.on('ping', ...)` in main suggests a `ping` channel originates from renderer in other code paths.
  - Routing-level coordination: `electron-router-dom` provides an abstraction so renderer routes are associated with named BrowserWindow instances; main loads renderer `index.html` under a `/main/` basename and dev server URL is adjusted accordingly.
- Main → Renderer:
  - Main can call webContents methods to send messages or open windows. The preload `contextBridge` exposes APIs to the renderer for synchronous/async operations.
- External integrations:
  - External URLs are opened with `shell.openExternal`.
- Persistence & storage:
  - No explicit persistence (filesystem/DB) code found in inspected files — likely either not implemented yet or located outside the inspected renderer/main sources.

## Build & Dev

- Dev: `electron-vite dev` via `npm run dev`.
- Prod build: `npm run build` runs TypeScript type checks and `electron-vite build`, packaged with `electron-builder` (scripts for mac, win, linux present).
- Postinstall runs `electron-builder install-app-deps`.

## Observations, Risks & Recommendations

- Observations:
  - The UI is strongly geared to a local, single-window workspace app with keyboard-first UX.
  - Many UI building blocks are present but stateful behaviors (persistence, full create/edit flows) seem unimplemented or exist elsewhere.
- Risks / Gaps:
  - No persistence layer found: clarify where documents are stored (filesystem, SQLite, remote API).
  - No explicit IPC contract documentation beyond a demo `ping` handler — recommend defining typed IPC channels and surfacing them via `preload` types.
  - No auth or multi-user support — if required, plan design for credential storage and sync.
- Recommendations (next steps):
  1. Locate or design the persistence layer (local files vs embedded DB).
  2. Add a small IPC contract doc (channels, payloads, responses) and TypeScript types in preload `.d.ts` to make renderer ↔ main calls safe.
  3. Implement and wire `CreatePage` to persistence and navigation.
  4. Add tests for routing and for critical preload APIs.

## Appendix — Files inspected

- `package.json`
- `electron.vite.config.ts`
- `src/main/index.ts`
- `src/preload/index.ts`
- `src/preload/index.d.ts`
- `src/renderer/src/main.tsx`
- `src/renderer/src/app.tsx`
- `src/renderer/src/routes.tsx`
- `src/renderer/src/pages/blank-page.tsx`
- `src/renderer/src/components/*` (Sidebar, Header, SearchBar, Navigation, Breadcrumbs, ToC components examined)
- `src/lib/electron-router-dom.ts`

---

If you want, I can:
- Link UI actions to a persistence prototype (filesystem or SQLite) and implement `CreatePage` behavior.
- Produce a short IPC contract document (TypeScript `declare` types) and wire typed `ipcInvoke` wrappers in `preload`.

