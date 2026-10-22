# ATB Atlas V13 — Spectrum Instrument

ATB Atlas is a static educational atlas hosted on GitHub Pages. V13 changes the application's presentation and workflow, while retaining the V12 clinical data and the existing source-backed relations.

## Experience

- Horizontal instrument navigation instead of a permanent multi-section sidebar.
- Map-first workspace with family-grouped antibiotic rows and color-coded microbiological territories.
- Quick-focus selectors for Pseudomonas, MRSA, E. coli BLEE, pneumococcus, and B. fragilis.
- Contextual filters, precision mode, and an on-demand inspector that opens beside the map on desktop or as a bottom sheet on mobile.
- Symbols and explanations remain separate from taxonomic group colors.
- Existing Antibiotics, Microorganisms, Clinical Syndromes, Comparator, Laboratory, Learning, and Sources screens remain connected.
- Color editor, saved views, global search, and accessibility / reduced-motion handling remain available.

## Clinical interpretation

The database currently catalogs 111 antibiotics, 79 microorganisms / phenotypes, 22 syndromes and 130 explicitly stored antibiotic-pathogen relations. The many other combinations are **not evaluated** and must not be interpreted as resistance or a negative spectrum result. Explicit relations in this pilot remain subject to individual clinical review. The atlas is not a prescribing tool.

## Deploy

This is plain static HTML/CSS/JavaScript using `data/atlas.json`, `data/insights.json`, and `assets/icons/*.svg`. Publish with GitHub Pages using the existing deployment workflow. No build tools or backend are needed.

## Accessibility

Keyboard search: Cmd/Ctrl + K. Escape closes the currently open modal or spectrum detail. Reduced-motion users do not receive entrance animations.