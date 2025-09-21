<!--
This file is generated/updated by an AI assistant to help AI coding agents be productive in this repository.
Keep it concise and update when repository structure or workflows change.
-->
# Copilot / AI agent instructions for this repository

Repository snapshot:

- Minimal static site: `index.html` at the repo root (simple "Hello World" page).

Primary goals for an AI agent working here:

- Make focused, minimal changes that preserve the single-file static-site intent.
- Don't introduce runtime/build dependencies (no package.json, no build system) unless the user explicitly requests one.

Quick architecture overview

- This repository currently contains only a static `index.html` file (no server, no frameworks). Treat it as a single-page static site.
- Files you might add should be colocated under the repo root and follow common static site layout (e.g., `css/`, `js/`, `assets/`).

Project-specific conventions and constraints

- Keep changes small and explicit. The repo owner appears to prefer minimalism — avoid scaffolding full front-end toolchains unless asked.
- When adding scripts or styles, reference them from `index.html` with relative paths (e.g., `<link rel="stylesheet" href="css/styles.css">`).
- If you add package/dependency files (like `package.json`), include a short README describing why the change was necessary and how to run build commands.

Developer workflows & commands

- There are no build/test scripts in this repository. Default developer workflow is:

  - Open `index.html` in a browser (double-click or use an editor Live Server).
  - If a local static server is needed, use a simple command such as `npx http-server` or Python's `python -m http.server` in the repo root. Prefer not adding these to the repo unless requested.

Integration points & external dependencies

- None detected. Do not add external APIs or CDNs without documenting the reason and expected privacy/trust implications.

Examples of valid edits

- Small content change: update the body text in `index.html`.
- Add a stylesheet: create `css/styles.css` and add `<link rel="stylesheet" href="css/styles.css">` to the head.
- Add an image asset: create `assets/` and reference with a relative URL.

What to avoid

- Avoid introducing node_modules, package managers, or build systems unless the user explicitly asks for them.
- Avoid changing repository layout from a single-file static site to a multi-service architecture without explicit instruction.

If you need clarification

- Make a small PR with the proposed change and a clear description. If the user responds, incorporate feedback.

Files to inspect for context

- `index.html` — the entire app; start here for any change.

Contact the repository owner for non-trivial changes

- If you need to add tests, CI, or a build system, create an issue first and summarize trade-offs in the PR description.

---
Generated: 2025-09-21
