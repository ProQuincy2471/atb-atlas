# ATB Atlas — Fieldguide V12

A static educational microbiology and antimicrobial-spectrum atlas for GitHub Pages. This edition is a substantial UI/UX rebuild, not a recoloring of V11.

## What is new

- **Spectrum Studio:** an editorial map with microorganism territories as color-coded columns and antibiotic families as grouped rows. Within a cell, separate status symbols represent each species/phenotype. No group-wide susceptibility is inferred.
- **Two reading lenses:** grouped spectrum bands or precise, clickable species indicators.
- **Persistent contextual inspector:** territory → species → individual drug–pathogen relation → clinical note and sources.
- **Intent navigation:** Micro × ATB, microorganism-first, and antibiotic-first explorers.
- **Full catalog views:** 79 microorganism and phenotype profiles and 111 antimicrobials organized by their actual family/group.
- **Clinical pathways:** 22 syndromes linked to differential organisms and guide references.
- **Head-to-head comparison** and a small interactive laboratory with drag-and-drop ordering and explanatory quizzes.
- **Chromatic studio:** four built-in palette systems and 12 editable microorganism-group colors, stored locally.
- **Study continuity:** save and restore map views; bookmark organism and drug profiles; share page links.
- **Responsive layout** with intrinsic horizontal scrolling of large spectrum tables rather than a horizontally overflowing page.
- Icons are local SVGs from the existing Font Awesome Free bundle. No new generated illustration or image assets. The app uses photographic references only where an attribution/source is documented in `insights.json`.

## Files

- `index.html`, `app.js`, `styles.css` — the frontend, no build step.
- `data/atlas.json` — existing catalog and provisional coverage relations; unchanged in V12.
- `data/insights.json` — existing teaching notes and attributed CDC images; unchanged in V12.
- `assets/icons/` — bundled SVG icon library.
- `qa_v12.py` — local UI smoke test using Playwright; injects actual JSON into a browser for environments restricting localhost.

## Deploy

Publish the repository root from GitHub Actions (GitHub Pages). `index.html` uses relative asset paths compatible with `https://proquincy2471.github.io/atb-atlas/`.

## Editorial guardrails

The catalog lists **111 antibiotics, 79 organisms or phenotypes, 22 syndromes and 130 explicit preliminary relations**. These do not constitute a validated susceptibility matrix. Absent relationships display as **not evaluated**, never as resistance or inactivity. Clinical interpretations require local antibiogram, infection site, source control, individual context, and current guidelines. This is not a prescribing support tool.