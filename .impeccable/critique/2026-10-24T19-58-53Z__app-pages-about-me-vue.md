---
target: about-me.vue
total_score: 25
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 0
target_identity: "file:/Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/about-me.vue"
target_fingerprint: "sha256:de1d6c2c6723ff1b2fe451c93a93b7c846454c75f48e14df9e84447c836b6400"
target_path: /Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/about-me.vue
timestamp: 2026-10-24T19-58-53Z
slug: app-pages-about-me-vue
---
Method: dual-agent (A: design review · B: detector + browser). Round 3 after P2/P3 fixes + colored tech-logo chips.

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Collapsed vs open card differs only by background |
| 2 | Match System / Real World | 3 | "Mar 2023 – Jan 2027" next to "3 yrs 8 mos" (duration to today); Romano outcome names internal products |
| 3 | User Control and Freedom | 4 | Independent toggles, scroll restore, reduced motion |
| 4 | Consistency and Standards | 3 | Toggle mid-card when photo present, bottom otherwise |
| 5 | Error Prevention | 3 | Content accuracy only |
| 6 | Recognition Rather Than Recall | 3 | Two of three cards hide body behind Read more |
| 7 | Flexibility and Efficiency | n/a | Portfolio surface |
| 8 | Aesthetic and Minimalist Design | 3 | Dead band under toggle beside photo; stack repeated as chips + bold |
| 9 | Error Recovery | 3 | Empty state present |
| 10 | Help and Documentation | n/a | Portfolio surface |
| **Total** | | **25/32 (78%)** | **Good** |

## Detector
CLI 0, browser overlay 0 (all cards expanded).

## Priority Issues (no P0/P1)
- [P2] Future end date + duration-to-today reads inconsistent; label planned end or "so far". → clarify (open: owner decision on wording)
- [P2] Expanded card with photo: toggle mid-card, ~200px dead zone under it at lg. → layout
- [P2] Contact/CV only at the end (~5 screens on mobile); add quiet CV action near hero. → layout
- [P3] Stack repeated as chips and bold text. → FIXED same round (tech names unbolded)
- [P3] Internship "Four months" unsupported by dates (Nov 20 2022 – Feb 1 2023). → FIXED same round

Also fixed same round: sr-only subline uses commas instead of "·"; duration wrapped in whitespace-nowrap.

## Persona Red Flags
- Recruiter: CV/contact far down; teaser doesn't say whether to reach out.
- Freelance client: proof after three employment cards; Romano outcome in internal product names.
- Sam: solid.
- Casey: page ~5710px; 7 chips wrap 4 rows.

## Minor
Alongside max-w-4xl breaks width rhythm; polaroid brightest element; no "now" cue on timeline; short internship could show fully; "Check back soon!" cheery.
