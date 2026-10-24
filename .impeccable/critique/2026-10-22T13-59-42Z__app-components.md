---
target: src/components (resolved app/components)
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/components"
timestamp: 2026-10-22T13-59-42Z
slug: app-components
---
Method: dual-agent (A: design review · B: detector + browser). Target requested as src/components, resolved to app/components.

## Design Health Score — 23/32 (Good, 72%; 7 and 10 n/a)
1 Visibility 3 — success closes dialog into a corner toast
2 Real world 2 — hype copy; IT leaks (typed roles, SB Templates tab); skills hero "Get to know me!"
3 Control 3 — Escape everywhere; Reset beside Submit, same weight, no undo
4 Consistency 2 — legal pages own header; 404 smaller than heroes; milestones vs projects expand differently; tabs look like buttons
5 Error prevention 2 — 10-char minimum unstated; empty email says "invalid"
6 Recognition 3 — globe never shows current language; combobox truncates selection
8 Aesthetic 2 — ~110-word skills paragraphs; 12-line templates intro; planets under text on mobile
9 Error recovery 3 — focus to first invalid, content kept on failure; vague messages

## Design Specificity
Authored edges (avatar, orange/navy, Bebas+Space Mono, polaroids, SB marks) around a template middle (one-word giant hero, Read-more card grids, three identical skill cards with orbits, hype copy). Skills page most interchangeable; avatar only on home.
Detector: CLI exit 0 but regex-only on .vue (element rules skipped). Browser 11: home 0; line-length x4 real (milestone ~88ch with image, ~125ch without); straggler x2 + unbalanced heading advisory; dark-glow x3, radial-halo (sun) and text-occlusion x3 (extension/overlay) false positives.
Correction: primary on surface is 4.79:1 (passes); fails only on surface-2 (4.24:1) in expanded "light" project cards.

## Priority Issues
[P1] Focus lost after Read more (blur() CustomProjectsCard.vue:81) and language switch (BaseIconMenu.onSelect); no aria-expanded; aria-pressed on single-select milestone dots → harden
[P1] Skills page is filler: three identical cards, ~110-word hype paragraphs, slogan CTAs, wrong hero, translucent text over orbits on mobile, 7/12 gold → distill + clarify
[P1] Finding work is slow: selected-work links all go to the generic list; first project at 1412px on mobile; title-only cards → layout
[P2] Primary text on surface-2 4.24:1 in expanded cards; flat bg-bg/50 scrim under titles on light covers → colorize
[P2] Form: empty email says invalid; 10-char min unstated; 4 simultaneous alerts; Reset weight; Submit below fold on mobile → harden + clarify

## Persona Red Flags
Jordan: typed role caught mid-word; no one-line value statement; SB Templates unexplained; context-free selected work.
Sam: focus to body after Read more / language; unnamed template tech icons; footer icons not aria-hidden; "Logo" alt; unannounced new tabs; toast may not announce.
Casey: footer links 20px, Read more 32px, Code 38px; Submit below fold; planets over copy; first project 1412px down.

## Minor
Dialog title truncate; globe without EN/IT; combobox should show count; selected work below fold on desktop; dead deploymentUrl default; mobile tabs as buttons; IT leaks ("SBT Logo", "Resetta"); personal mobile number in footer; expanded project reflows grid; sb-templates h1 says "My Web Projects".

## Questions
One sentence vs rotating roles? Gold at 2? Astronaut beyond home? SB Templates: project or product?
