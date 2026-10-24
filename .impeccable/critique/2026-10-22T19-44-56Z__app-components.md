---
target: app/components
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/components"
timestamp: 2026-10-22T19-44-56Z
slug: app-components
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score — 22/32 (69%, 7 and 10 n/a)
1 Visibility 3 — silent client-side route changes (focus on BODY, no announcer)
2 Real world 3 — skill dots without legend; "Total Skills: { tot }"
3 Control 3 — milestone can't collapse; Escape on mobile menu drops focus to BODY
4 Consistency 2 — Read more accordion vs toggle; meta on home cards not on project cards; Projects hero/tab/h2 triple title
5 Error prevention 3 — counter hides 10-char minimum
6 Recognition 3 — "2 selected" hides which categories
8 Aesthetic 2 — 40dvh heroes repeat nav label; three identical skill cards; course exercises next to client work
9 Error recovery 3 — solid

## Specificity
Look is authored (Bebas+Space Mono, orange/navy, astronaut, orbits, gold cards); structure is the stock dev-portfolio template; space world limited to two decorations.
Detector: CLI 0 (regex-only on .vue). Browser: home/projects/templates 0; about line-length x8 (~86ch with image, ~124ch without); typed.js blinking cursor (owner-intended); stragglers; mobile footer padding (borderline); sun glow/halo and overlay occlusion false positives.

## Priority Issues
[P1] Mobile menu/navigation a11y: toggle outside focus trap (X unreachable by Tab), focus to BODY after Escape, no skip link, no NuxtRouteAnnouncer, no focus target after deep link → harden
[P1] Inner-page hero spends first screen repeating nav label: 40dvh + 88px floor; IT "COMPETENZE E TECNOLOGIE" 264px tall, near overflow at 390px; Projects triple title, first card ~579px → distill, layout
[P2] Best proof hidden: About opens on 2018, current role last/collapsed; client site 3rd in Projects with course games in between; no meta on project cards → clarify
[P2] Justify misapplied: 404 centered paragraphs and 2-line home meta show rivers; 110–124ch lines in About (no image) and legal pages → typeset
[P3] Skills dialog on mobile is 61% controls; truncated placeholder; "1 / 1" pagination → adapt

## Persona Red Flags
Jordan: 4 rotating roles vs frontend focus; no employer/years on home; current job last; no dot legend.
Sam: X unreachable, BODY focus after Escape, no skip link/announcer; language trigger aria-label overrides visible EN; tabpanel unlabeled.
Casey: 36px grey close; 36px Code/Live top-right; 88px hero; cramped skills dialog.

## Minor
Stray space before comma in consent; "UI/ UX"; hint/error/counter overlap; white covers glare, README-screenshot cover; ~20 hex in CustomSolarSystem; language menu placement; no external cue on template CTAs; duplicated footer credit; #selected-work-title no scroll-mt; frequent hyphenation on mobile.

## Questions
First-screen takeaway vs 4 rotating roles? Course games next to client work? 40% screen for page name? Extend the space world beyond two decorations?
