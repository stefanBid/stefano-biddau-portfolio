---
target: home page
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/index.vue"
target_fingerprint: "sha256:41bc0755ff766cdaa8a64cd63d4bf192c4d15ab391b76a12967da78f2a65790d"
target_path: /Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/index.vue
timestamp: 2026-10-23T14-18-30Z
slug: app-pages-index-vue
---
Method: dual-agent (A: design review via Playwright screenshots 1440/390 EN+IT, reduced-motion, focus, dialog · B: impeccable detect CLI + live overlay, contrast/overflow/outline/a11y/console probes)

# Home page critique — round 1

## Design specificity verdict
Partly specific. Owned identity (3D astronaut avatar, Bebas Neue + Space Mono, orange on blue-black) over a generic developer-portfolio composition; one section rhythm throughout. Positioning lives only in the typed animation and contradicts meta/timeline.

## Heuristics
| # | Heuristic | Score |
|---|---|---|
| 1 | Visibility of system status | 3 |
| 2 | Match with real world | 3 |
| 3 | User control and freedom | 3 |
| 4 | Consistency and standards | 2 |
| 5 | Error prevention | 3 |
| 6 | Recognition rather than recall | 3 |
| 7 | Flexibility and efficiency | n/a |
| 8 | Aesthetic and minimalist design | 2 |
| 9 | Error recognition and recovery | 3 |
| 10 | Help and documentation | n/a |
Total 22/32 (69%) — Acceptable.

## Priority issues
- [P1] Reduced motion: typed.js gets typeSpeed 9999 (≈10s/char) → hero role blank for sighted reduced-motion users (useTypedText.ts:68).
- [P1] No static positioning: H1 is a greeting, role only in a 4-way animation; meta description says front-end, title/timeline say full-stack.
- [P1] First desktop viewport (1440x900) carries no proof: 100dvh hero pushes Selected work fully below the fold.
- [P2] Selected work covers: two bright white panels (SB Templates logo on bg-ink, npm README screenshot).
- [P2] GitHub orange numerals out-shout the work; "Most starred" duplicates sb-floating-panel-vue and frames 3–4 stars.

## Detector (B)
CLI 0 findings. Overlay: blinking-cursor (typed.js, intentional), stragglers "Flutter", "today."/"oggi.", IT footer "volta.", "riservati.". Contrast 0 failures / 85 nodes. No overflow at 360/390. Clean heading outline. No console/hydration errors. Covers/logos lack width/height.

## Personas
Recruiter: role unreadable at first glance, no location/availability, weak star counts, CV hint missing. Small-business client: 1/3 works is client work, jargon tiles, no reassurance at CTA. Keyboard/SR/reduced-motion: reduced-motion hero bug; core-stack tiles look clickable but are not.

## Minor observations
Justify+hyphens breaks in short leads on mobile; closing avatar hidden on mobile; ~160px dead band before footer; Vite/Flutter under Frontend; repeated "Full Stack Developer" titles; dialog close hit area; IT "Tempo indeterminato" wrap.

Questions skipped: user pre-authorized full scope for this loop
