---
target: home page
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 0
target_identity: "file:/Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/index.vue"
target_fingerprint: "sha256:b5dc9866eaf06d3388b3ef7f54e985386e38556d686eb120ca3b48f68623519b"
target_path: /Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/index.vue
timestamp: 2026-10-23T15-40-38Z
slug: app-pages-index-vue
---
Method: dual-agent (A: design review via Playwright 1440/1024/390 EN+IT, reduced-motion, keyboard walk, dialog, CV download, deep link · B: impeccable detect CLI + live overlay at 1s/6s, contrast/overflow/outline/a11y/console/motion/mailto probes)

# Home page critique — round 3

## Design specificity verdict
Moderately specific, carried by assets (astronaut avatar, orange/navy, Bebas + Space Mono, real build-time data) rather than structure (standard dev-portfolio section stack, repeated section header pattern).

## Heuristics
| # | Heuristic | Score |
|---|---|---|
| 1 | Visibility of system status | 3 |
| 2 | Match with real world | 3 |
| 3 | User control and freedom | 3 |
| 4 | Consistency and standards | 3 |
| 5 | Error prevention | 3 |
| 6 | Recognition rather than recall | 3 |
| 7 | Flexibility and efficiency | n/a |
| 8 | Aesthetic and minimalist design | 3 |
| 9 | Error recognition and recovery | 3 |
| 10 | Help and documentation | n/a |
Total 24/32 (75%) — Good. P0 0, P1 0.

## Priority issues
- [P2] Selected work undersells proof: white/README covers; Romano card lacks a live-site link.
- [P2] Freelance path thin; GitHub block developer-only, "Most starred" with 3–4 stars.
- [P2] Role delayed ~2.7s by typewriter; Full-Stack positioning vs PRODUCT.md "front-end who designs"; stack leads with Angular.
- [P3] No contact path between hero and closing band; header has no Contact.
- [P3] Core stack: Vite as framework, no TypeScript; compact tiles look clickable but are inert.

## Detector (B)
CLI 0. Overlay only stragglers ("Flutter", "today."/"oggi.", IT footer). Contrast 0 failures. No overflow 360/390. No infinite animations or cursor at 6s; reduced motion static within ~0.75s. mailto correct, fits at 360. Justified 2-line h3 inside li at 360 (fixed after the round: text-left on card and experience h3).

## Minor observations
IT "Studio Legale Romano (Website)"; hyphenation in short leads (data-base, pro-dotti, ri-spondo, expe-riences); GitHub data noise (HTML language, emoji, mid-word truncation); CV is a JS button, no aria-haspopup on Get in touch; footer tagline/meta hype; 1024x768 no section peek.

Questions skipped: user pre-authorized full scope for this loop
