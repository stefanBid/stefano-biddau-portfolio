---
target: project page round 3
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 0
target_identity: "file:/Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/my-projects.vue"
target_fingerprint: "sha256:4c0d4a9b1f2185d19f2d0a61a271e7039595ae63cce0d919a20a696ae4033f34"
target_path: /Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/my-projects.vue
timestamp: 2026-10-26T10-07-09Z
slug: app-pages-my-projects-vue
---
Method: fresh-context design review (round 3) + detector (0 findings, 5 files)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | System status | 3 | Tabs, Ongoing chip, chevrons clear |
| 2 | Match real world | 3 | Templates section has 3 names (tab / page title / heading) |
| 3 | User control | 3 | "Read less" only at bottom of long text |
| 4 | Consistency | 2 | SB Templates tab different card system (sb-h1 heading, gap-20, dark-hover); Code menu items no ↗ |
| 5 | Error prevention | 3 | |
| 6 | Recognition | 3 | 5x "Code (opens in a new tab)" without project context |
| 7 | Flexibility | n/a | Experience |
| 8 | Aesthetic | 3 | White covers glare; Romano crop; template tech chips noise |
| 9 | Error recovery | 3 | |
| 10 | Help | n/a | Experience |
| Total | | 23/32 (72%) | Good |

## Priority Issues (no P0/P1)
- [P2] SB Templates copy hype/generic (en.json:420,431,442, meta.sbTemplates "Start building today"). Fix: real "what's inside" lines (owner facts), drop hype.
- [P2] Romano: first paragraph status update before what was built; featured card never collapses, mobile Live site ~1100px below title. Fix: lead with what was built; link row under meta or collapse below lg.
- [P2] SB Templates tab inconsistent: sb-templates.vue:39 sb-h1, :50 gap-20, CustomSbTemplatesCard.vue:52 dark-hover; "SB Templates" name never visible.
- [P2] SR link names lack project context (CustomProjectsCard.vue:189-222, index.vue:123-152); IT cover alts English and generic.
- [P3] Romano cover object-center cuts logo; chip over screenshot nav. Asset note: white covers (npm screenshot, Sfrigola banner) glare.
