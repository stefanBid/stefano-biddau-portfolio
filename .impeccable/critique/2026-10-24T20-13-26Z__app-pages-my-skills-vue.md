---
target: my-skills
total_score: 22
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:/Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/my-skills.vue"
target_fingerprint: "sha256:c5ab3e5d05af48ecf1236f861100f4bd4f0563f72383260077ec445bf68e33aa"
target_path: /Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/my-skills.vue
timestamp: 2026-10-24T20-13-26Z
slug: app-pages-my-skills-vue
---
Method: dual-agent (A: design review · B: detector + browser overlay)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Page change not announced (live region = total only); 400ms debounce no feedback |
| 2 | Match System / Real World | 2 | Postman in "Design tools"; GraphQL category `database`; 0–5 scale undefined |
| 3 | User Control and Freedom | 3 | Layered Esc + focus return good; no "clear all"; filters reset on close |
| 4 | Consistency and Standards | 2 | Title mismatch page vs dialog; 5/5 non-gold (Headless UI, npm); 4.5 renders 4 squares; Core stack ≠ gold set |
| 5 | Error Prevention | 3 | Presets exclude `other` → Tailwind (gold) missing from Frontend |
| 6 | Recognition Rather Than Recall | 2 | Content behind click → modal → 4 pages |
| 7 | Flexibility and Efficiency | 2 | No "show all" entry, no URL state, 37 items paged by 12 |
| 8 | Aesthetic and Minimalist Design | 2 | 3 identical min-h-96 cards, mostly empty; 9 gold cards dilute gold |
| 9 | Error Recovery | 2 | Generic empty state, no reset, no contact fallback |
| 10 | Help and Documentation | 1 | Nothing explains scale or gold meaning |
| **Total** | | **22/40** | **Acceptable** |

## Design Specificity Verdict
LLM: category-interchangeable skill-bar grid in modal + decorative solar system. Solar system unique to brand but encodes nothing (orbit icons mismatch data, hidden on mobile, repeated ×3). Level squares violate "Prove, don't claim"; evidence exists (project meta lines, SI2001 milestone) but unlinked.
Detector: CLI `[]` exit 0. Browser overlay 4: dark-glow ×3 (.sun-core box-shadow, CustomSolarSystem.vue:152-159, once per card), radial-halo ×1 (.sun-glow, :112-119, labeled body fallback). False positive as bug (intentional gold-token sun) but corroborates "decoration repeated ×3".
Overlays left in [Human] Skills critique tab.

## Priority Issues
- [P1] Skill data self-contradicting + claim-only: Postman tool+isGod leads Design preset (useSkills.ts:193, my-skills.vue:30); Tailwind `other` (:273) missing from Frontend; GraphQL `database` (:121); C# 1.5 (:57); 4.5 → 4 squares. Fix: recategorize, align gold with home Core stack, drop <3, replace squares with "Shipped in" evidence or Daily/Shipped/Familiar tiers. Cmd: shape → clarify.
- [P1] Core content trapped in modal: page = 3 paragraphs; no logos above fold or on mobile. Fix: inline grouped stack, all 37, no pagination, Frontend weighted; search optional/drop dialog. Cmd: layout → distill.
- [P1] Dead end: no CTA after Design card (my-skills.vue:189-195), unlike Home/About CustomClosingCta. Fix: add CustomClosingCta + empty-state "Don't see X? Ask me". Cmd: clarify.
- [P2] Mobile/mid-width: justified mono rivers; mobile dialog filters ~330px; search truncated by w-48 combobox (CustomSkillsDialog.vue:137); planets behind text 768–1023px / 200% zoom. Fix: text-left <md, stack filters, solar system lg+. Cmd: adapt + typeset.
- [P2] Triple-repeated cards, meaningless solar system (source of 4 detector glows). Fix: orbits encode data (inner = daily, planets = real skills, clickable) or one hero system + simpler sections. Cmd: bolder / overdrive.

## Persona Red Flags
- Jordan: tool-name paragraphs w/o client meaning; squares say nothing; no end contact; technical empty-state copy.
- Sam: grid divs not list (CustomSkillsDialog.vue:162), names spans; gold color-only (1.4.1); silent paging; no aria-haspopup="dialog"; BaseEmptyBox.vue:26 icon not aria-hidden; planets under text at 200%.
- Casey: ~2.7k px no icons; 36px close top-right; filters ~40% viewport; placeholder truncated.
- Recruiter: no logos first viewport; Backend no gold, max 4 vs "Full-Stack" meta; Postman top skill; Nuxt page 2; no CV.

## Minor Observations
- combobox id="skill-level" (CustomSkillsDialog.vue:135)
- it.json:301 filterOptions.all missing in en.json
- IT Title Case; "Total Skills: {tot}" stiff
- hero lead prop unused (my-skills.vue:73-77)
- meta description pushes React 3.5 + "UI/UX"; meta title "Full-Stack" vs front-end positioning
- filter shown twice (chip + combobox)
- useSkills skills/pagination duplicate filter+sort
- "pow-er" hyphenation mobile subtitle

## Questions to Consider
- If "4/5" can't be checked, why show it vs where it shipped?
- Could orbit distance be the data?
- Why is the only content of a stack page inside a modal?
