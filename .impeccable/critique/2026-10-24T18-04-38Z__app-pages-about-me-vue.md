---
target: about-me.vue
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/about-me.vue"
target_fingerprint: "sha256:c360cff516c3c035c5ccaf0a95f8dc74eedc0375d44d1321bfb551201ec264f5"
target_path: /Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/about-me.vue
timestamp: 2026-10-24T18-04-38Z
slug: app-pages-about-me-vue
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | aria-expanded, label swap, scroll restore |
| 2 | Match System / Real World | 2 | Future endDate "Jan 2027" + "Coming soon" = ambiguous availability; 3 role labels |
| 3 | User Control and Freedom | 3 | Independent toggles; no expand all |
| 4 | Consistency and Standards | 3 | Hero lead reuses pages.home.lead; upcoming card hand-rolled; centered Read more on mobile |
| 5 | Error Prevention | 3 | Little risk |
| 6 | Recognition Rather Than Recall | 3 | "More than five projects" never named |
| 7 | Flexibility and Efficiency | n/a | Portfolio surface |
| 8 | Aesthetic and Minimalist Design | 2 | Placeholder first card; 7-paragraph degree; dead gap beside sticky photo |
| 9 | Error Recovery | 3 | BaseEmptyBox fallback |
| 10 | Help and Documentation | n/a | Portfolio surface |
| **Total** | | **22/32 (69%)** | **Acceptable** |

## Design Specificity Verdict
Category CV-timeline template with brand on top. Product-specific: real polaroid photos, real client names, both partly hidden behind expand. No bio, no design half. Detector: 0 findings (CLI + browser, EN+IT). Detector missed `max-w-[75ch]` arbitrary value (about-me.vue:79, CustomMilestone.vue:146).

## Priority Issues
- [P1] Identity contradicts itself: "Full Stack Developer" / "back-end developer" / "front-end developer" / FE-only chips / meta "Full-Stack & Web Designer". Fix: one headline role, assignment in subline, align chips+meta+lead. → clarify
- [P1] Availability ambiguous + placeholder first: upcoming card (about-me.vue:46-72) + endDate 01/10/2027. Intentional per CLAUDE.md. Fix: show "Present", name upcoming concretely or drop, add availability line. → clarify
- [P1] No "about" for freelance clients: hero reuses pages.home.lead (about-me.vue:44); no bio/how I work/at-a-glance. Fix: About-specific lead, ≤4-item at-a-glance block, real photo above fold. → shape
- [P2] Timeline doesn't link to proof: projects unnamed, clients plain text. Fix: per-milestone Related work links to /my-projects anchors, "Alongside" track. → layout
- [P2] Long-form readability: degree 7 florid paragraphs, preview = weakest paragraph (MAX_CONTENT_BLOCKS=1), md:*:text-justify rivers on monospace. Fix: one-line outcome preview + bullets, cut ~60%, text-left. → distill, typeset

## Persona Red Flags
- Recruiter <60s: Coming soon first; 3 role labels; FE chips vs BE text; CV only at bottom; client ownership unclear.
- Freelance client: no services/design work; photos behind expand; freelance vs day job unclear.
- Casey (source only): avatar order-1 pushes timeline below fold; long default-open card; centered toggle; closing avatar hidden on mobile.
- Sam: upcoming h2 "Coming soon" useless in heading nav; no Career section heading.

## Minor Observations
- max-w-[75ch] arbitrary ×2; duplicated upcoming markup/dot offsets; duplicate date fact on upcoming card; timeline rule uncapped; hero image provider="none" full 1024×1536 + fetchpriority high for ≤240px box; degree chips low signal; IT milestone titles unused.

## Questions to Consider
- What must a recruiter learn from the first card under the hero?
- Why are real photos behind Read more while the avatar takes the hero?
- Which identity is this page selling, to which audience?
