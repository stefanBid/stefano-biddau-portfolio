---
target: project page
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/my-projects.vue"
target_fingerprint: "sha256:5f0d6a72f4daa5a097235438bbdfbff60b67851485ad41b0d0afb7f1672a4e4a"
target_path: /Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/my-projects.vue
timestamp: 2026-10-26T08-47-58Z
slug: app-pages-my-projects-vue
---
Method: dual-agent (A: design review · B: detector)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Expanded state only bg flip; Romano 1627px no position cue |
| 2 | Match System / Real World | 3 | floating-panel "Live site" -> npm (CustomProjectsCard.vue:84); "SB Templates" tab opaque |
| 3 | User Control and Freedom | 3 | Romano "Read less" at bottom of 13-paragraph wall |
| 4 | Consistency and Standards | 2 | h2 vs h3 titles across tabs; template CTA hover scale (CustomSbTemplatesCard.vue:153); Sfrigola menu Code no chevron; Read more -ml-6 hack (:221) |
| 5 | Error Prevention | 3 | Mislabelled destinations |
| 6 | Recognition Rather Than Recall | 2 | Icon-only Code/Live on mobile; unlabeled tech icons; project.skills not rendered |
| 7 | Flexibility and Efficiency | n/a | Experience surface |
| 8 | Aesthetic and Minimalist Design | 2 | "Projects" x3; empty first viewport; ~17 orange primaries; justified mono rivers |
| 9 | Error Recovery | 3 | Empty state ok; no cover fallback |
| 10 | Help and Documentation | n/a | Experience surface |
| Total | | 21/32 (66%) | Acceptable |

## Design Specificity Verdict
Brand layer authored; structure generic: 6 equal cards 2-col (my-projects/index.vue:68), Romano same weight as 2022 course exercises; SB Templates 3 identical cards/CTAs. Missed: stack per project (data exists), thesis stock-hanger cover, floating-panel npm screenshot cover.
Detector: CLI 0 findings on 14 files. Browser desktop 0. 390px: 1 straggler at my-projects/index.vue:63 (justified + hyphens:auto) — overlaps P2 #5.

## Priority Issues
- [P1] Page ends on Pig Game, no CustomClosingCta (only content page without). SB Templates ends on "Coming Soon / Stay tuned!" (sb-templates.vue:65-79). Fix: CustomClosingCta + contact form after NuxtPage in my-projects.vue; exercises to compact last row. Cmd: layout + clarify
- [P1] No hierarchy flagship vs exercises. Fix: Romano full-width feature (products list, stack chips); floating-panel + Sfrigola 2-col; exercises compact; optional kind overlines. Cmd: layout -> bolder
- [P1] Stack per project not shown though project.skills exists. Fix: 3-5 BaseChip under meta, gold core, link /my-skills. Cmd: shape/clarify
- [P2] First viewport no work + heading x3. Fix: H2+desc into ThePageHero lead, remove in-panel header, shorter hero. Cmd: distill + layout
- [P2] Card reading/noise: justified mono rivers, always-on mask-b-from-50% (CustomProjectsCard.vue:211), Romano 13 paragraphs + 1000px hole, all-primary buttons. Fix: text-left, conditional mask, cut Romano, secondary/outline sm links, "npm" label. Cmd: typeset + quieter + clarify

## Persona Red Flags
- Recruiter: empty hero, stack depth hidden, half grid thesis/exercises, no CV, SEO title "Full-Stack" vs front-end positioning.
- Client: Romano marketing prose not outcomes; no contact at end; thesis/exercises/templates noise.
- Jordan: SB TEMPLATES jargon; Live site->npm; 6 identical Read more.
- Casey: first card y=812; icon-only Code/Live; Read more off-centre; "@floating-/ui/vue" break; no contact.
- Sam: 6x "Read more" no project name; heading levels inconsistent; rocket Icon no aria-hidden (CustomSbTemplatesCard.vue:122); hardcoded EN logo alt (:60); meta text-ink/80 over busy covers.

## Minor Observations
tabs[].icon dead data (my-projects.vue:11-14); expanded card surface-2 flip; template glow raw shadow in <style scoped>; centred template desc hyphenation; Flutter tech row 3 tiles vs 1; generic meta description; SB Templates "Coming soon" card flagged, user decides (About teaser is deliberate).

## Questions
- Romano as mini case study instead of equal card?
- SB Templates as tab vs single "Open source" band?
- Interface recedes: whole cover clickable, orange only on closing Contact/CV?
