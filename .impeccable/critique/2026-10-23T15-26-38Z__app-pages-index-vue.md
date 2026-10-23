---
target: home page
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/index.vue"
target_fingerprint: "sha256:7ba720ac314f63bcc66e77915059df4d74e0b36835153bbd65f4056ba3f9e6f8"
target_path: /Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/index.vue
timestamp: 2026-10-23T15-26-38Z
slug: app-pages-index-vue
---
Method: dual-agent (A: design review via Playwright 1440/768/390 EN+IT, reduced-motion, keyboard walk, dialog, hover · B: impeccable detect CLI + live overlay, contrast/overflow/outline/a11y/console/reduced-motion probes)

# Home page critique — round 2

## Design specificity verdict
Specific in assets (3D astronaut, orange/navy, Bebas + Space Mono, real data), generic in composition (standard dev-portfolio section stack). The site-as-proof positioning is unused.

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
Total 24/32 (75%) — Good.

## Priority issues
- [P1] Typed hero line loops forever with blinking cursor, no pause (WCAG 2.2.2); copy ("UI/UX Enthusiast", Back End) undercuts the lead; reduced motion shows "Front End Developer" against a full-stack lead.
- [P1] No freelance signal: lead reads as employee bio; no direct email near CTAs.
- [P2] GitHub stats out-shout the work; Most starred duplicates floating-panel; GitHub language "HTML" on Flutter template.
- [P2] Mobile: Download CV at/below fold (IT below).
- [P2] White covers glare; hover zoom lacks focus-visible equivalent and reduced-motion guard.

## Detector (B)
CLI 0. Overlay: blinking-cursor (true positive with motion), stragglers "Flutter", "today."/"oggi.", IT footer "volta."/"riservati.". Contrast clean (cursor mid-blink false positive). No overflow 360/390. Clean outline, landmarks, lang. Reduced motion: static role within ~0.7s, no cursor. Covers load ~3400px originals for ~434px display.

## Minor observations
Hyphenation in Core stack/closing leads on mobile; hype footer tagline and meta "modern, user-focused digital experiences"; ~160px dead band before footer; header wraps at 768; duplicate Experience titles/icons; IT lowercase months; inert raised stack tiles; long IT CTA "Mettiti in contatto"; hero avatar 1024w on mobile.

Questions skipped: user pre-authorized full scope for this loop
