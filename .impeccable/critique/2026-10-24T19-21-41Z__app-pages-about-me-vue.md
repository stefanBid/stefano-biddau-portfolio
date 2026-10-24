---
target: about-me.vue
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 0
target_identity: "file:/Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/about-me.vue"
target_fingerprint: "sha256:ef0c5cdc690a60775582e109918b77b2cea89bc07990164425d4ccad60629ed3"
target_path: /Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/about-me.vue
timestamp: 2026-10-24T19-21-41Z
slug: app-pages-about-me-vue
---
Method: dual-agent (A: design review · B: detector + browser). Round 2 after fixes: About-specific lead, back-end chips, degree copy distilled, role-label alignment, teaser heading, timeline sr-only h2 + h3 milestones, "Alongside the day job" section linking proof.

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Read more gives no hint of how much is behind it |
| 2 | Match System / Real World | 3 | SI2001 unexplained; lead "since 2023" vs timeline Nov 2022 |
| 3 | User Control and Freedom | 3 | No expand all |
| 4 | Consistency and Standards | 3 | Ghost toggle ~7px off text edge; IT "Full Stack" vs "full-stack" |
| 5 | Error Prevention | 3 | No inputs |
| 6 | Recognition Rather Than Recall | 3 | Two identical "Full-Stack Developer" headings |
| 7 | Flexibility and Efficiency | n/a | Portfolio surface |
| 8 | Aesthetic and Minimalist Design | 3 | Self-assessment paragraphs; dead band beside sticky photo |
| 9 | Error Recovery | 3 | Empty state handled |
| 10 | Help and Documentation | n/a | Portfolio surface |
| **Total** | | **24/32 (75%)** | **Good** |

## Detector
CLI 0 findings. Browser overlay (all cards expanded): 1 straggler — "dataset." alone on last line of degree paragraph 2 (width-dependent, true positive, minor).

## Priority Issues (no P0/P1)
- [P2] Teaser leads timeline, blurs availability for recruiters (owner decision; execution: demote or move below current role). → clarify/layout
- [P2] Identical "Full-Stack Developer" headings for internship and current role. → clarify
- [P2] Freelance path buried (~2.6 screens desktop, 5+ mobile), Alongside rows text-only, no design evidence. → layout
- [P2] Milestone copy self-assesses (SI2001 para 3, internship closing line); internship collapsed preview long. → distill
- [P3] Desktop rough edges: dead band before Show less, toggle offset, Alongside row width. → polish

## Persona Red Flags
- Recruiter: teaser doubt, duplicate titles, SI2001 unexplained, CV only at ~3000px.
- Freelance client: no design proof, outcome-less rows.
- Sam: solid; small projects/email link targets.
- Casey: current role at ~1010px on mobile; page ~7.4 screens.

## Minor
"since 2023" vs Nov 2022; IT casing drift; redundant md:*:text-justify; hyped caption; reverse() order fragile; Alongside repeats home Selected Work with less info.
