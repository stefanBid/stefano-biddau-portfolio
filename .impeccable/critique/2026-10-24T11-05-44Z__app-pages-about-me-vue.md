---
target: about-me page
total_score: 19
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/about-me.vue"
target_fingerprint: "sha256:96543b8bffdc67c0e155b59e61c77ee753e98066053b38b969fea24c2eba5d14"
target_path: /Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/about-me.vue
timestamp: 2026-10-24T11-05-44Z
slug: app-pages-about-me-vue
---
Method: dual-agent (A: design review · B: detector + overlay)

## Design Health Score — 19/36 (53%, Acceptable; H10 n/a: content page, no task flow)

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | System status | 2 | Active vs inactive card differ only by fill + halo; polaroid flashes white on open (lazy image starts loading only then) |
| 2 | Real world match | 2 | HR-style titles ("Permanent Position at SI2001"), exact single-day dates for multi-year periods |
| 3 | User control | 2 | One card open at a time; open card can't collapse; its dot says aria-expanded=true but click does nothing |
| 4 | Consistency | 2 | Home Experience list shows ranges/durations/type icons, this deeper page shows less; role label varies (Full Stack / front-end / web designer) |
| 5 | Error prevention | 3 | Opening lower card collapses upper one → page jump |
| 6 | Recognition | 2 | Collapsed cards no summary; stack buried in bold words in prose |
| 7 | Flexibility | 1 | 30s scan has nothing to grab: no summary, no stack chips, no CV/contact |
| 8 | Minimalist | 2 | Clean visuals, flowery copy; academic card 7 paragraphs ≈350 words |
| 9 | Error recovery | 3 | Empty state exists; "Check back soon!" odd for portfolio |
| 10 | Help | n/a | — |

## Design Specificity
LLM: category-interchangeable layout (big title + avatar, dot rail, prose cards). Specific bits: polaroid real photos, Bebas/Space Mono, astronaut. Copy generic, breaks "direct, plain; no hype".
Detector: CLI clean on page + ThePageHero + CustomMilestone + BaseEmptyBox (static scan blind to runtime class state). Overlay: 3 findings — 2× line-length (~86 ch, 908px measure) on active milestone body, cause CustomMilestone.vue:161 drops max-w-[75ch] when active+image (= default state on load); 1× straggler "life." on polaroid caption (:184). B's 20×20 dot hit-area note = false positive: before:-inset-3.5 / md:-inset-3 gives 44px.

## Priority Issues
- [P1] Dead end. Timeline → footer, no contact/CV/next page (breaks principle 4). Fix: extract home closing CTA (index.vue:273-310) into shared component, place after timeline. Cmd: /impeccable layout
- [P1] Story stops Mar 2023; no freelance/OSS (Romano, sb-floating-panel-vue, SB Templates). Meta description promises freelance + approach, page doesn't deliver. Fix: "Now" entry/intro linking Projects anchors; one role label; align meta. Cmd: /impeccable clarify
- [P1] Deeper page carries less data than home. useMilestones parses role/organization/endDate/type, CustomMilestone never shows them. Fix: header "Role · Org", range + duration, type chip, stack chips; share date helpers with CustomExperienceList. Cmd: /impeccable layout
- [P2] Active body unbounded measure ~86ch (CustomMilestone.vue:161) on desktop; justified mono on 279px mobile column → rivers. Fix: keep 75ch cap always; text-left below md. Cmd: /impeccable typeset
- [P2] Open/close model fights user: single-open, no collapse, 2 tab stops per card, layout jump, smooth scroll ignores reduced motion (about-me.vue:49-52), full-size images (317KB) no sizes. Fix: independent toggles, dot decorative, Read more ↔ Show less, reduced-motion scroll, sizes on NuxtImg. Cmd: /impeccable harden

## Persona Red Flags
- Jordan: no one-line "who I am"; dots not obviously clickable; ends with nothing to do.
- Sam: dot + Read more announce different things; open dot "expanded" does nothing; caption = alt → read twice (use figure/figcaption, alt=""); timeline div not ol; section only aria-label.
- Casey: avatar eats first screen; first card ~1354px tall; justified gaps; ~3.9k px, no closing CTA; IT title wraps 2 lines.
- Recruiter 30s: role/company/tenure/stack not at a glance; no CV here; "Full Stack" vs front-end+design claim.
- Freelance client: no client work, process, or contact.

## Minor
- md:-ml-6 on Read more pushes focus ring flush to card edge.
- ~180px empty under text in open card desktop (image column taller).
- headerOffset=80 magic number + WHAT comment → scroll-margin-top.
- Three names for one page: "My journey" / "About me" / "Professional timeline".
- aria-controls targets body rendered only when content exists.
- Hero avatar eager 271KB decorative.
- Caption straggler → text-balance.
- TheFooter.vue:55,88 tracking-[0.22em] arbitrary value (outside page scope).

## Questions
1. What does this page do that home Experience list doesn't do better?
2. Why does story end 2023 when differentiators come after?
3. Should About become "how a dev who designs works" instead of CV in prose?
