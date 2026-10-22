---
target: all components
total_score: 15
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:/Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/components"
timestamp: 2026-10-22T12-30-18Z
slug: app-components
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score — 15/32 (Poor; 7 and 10 n/a)
1 Visibility 2 — consent error never rendered; filter state truncated
2 Real world 2 — "Welcome Back" to first-timers; MM/DD dates in IT; IT project title in EN
3 Control 2 — one Escape closes filter + dialog; send failure wipes form; focus not restored
4 Consistency 2 — two focus-ring colors; role=menu combobox; error.vue off-system; EN-hardcoded aria-labels
5 Error prevention 2 — submit-only validation, errors never clear on input
6 Recognition 2 — icon-only project links; unlabeled search/filter; unlabeled level squares
7 n/a — portfolio
8 Aesthetic 2 — 100vh slogan per page; justified monospace walls
9 Error recovery 1 — invisible consent error; failed send destroys text; partial failure invites duplicate
10 n/a — portfolio

## Design Specificity
Personal assets (avatar, SB mascots, polaroid, solar system, gold cards) on a generic dark-portfolio skeleton: full-viewport gradient-text slogan + bouncing chevron per page, two centered CTA cards, generic sales copy.
Detector: CLI 2 findings (side-tab BaseRichText.vue:82 = blockquote rule, false positive; bounce-easing ThePageHero.vue:54). Browser: gradient-text hero h1 (all pages), low-contrast active nav 4.24:1, BaseTabs active 3.2:1, ink-muted on info-soft 4.1:1 (sb-templates.vue:75), line-length 122–135ch (about, projects, templates), sun glow/halo (false positives).

## Priority Issues
[P0] Contact form fails silently and loses data — BaseCheckbox no error output; CustomContactForm.vue:126 closeForm on failure + watch 145–153 resets; partial failure shows error; empty message uses wrong key. Fix: checkbox error role=alert, keep form open with data, admin-sent = success, focus first invalid, clear on change, truthful consent copy. → harden
[P1] First screen carries no information — ThePageHero 100vh on 4 pages; home h1 "Welcome Back", name below fold, no work on home. Fix: name+role h1 with CTAs, 2–3 project strip, compact hero variant. → layout, clarify
[P1] Keyboard/SR in overlays — unlabeled lang/close/pagination buttons; window-level Escape conflict; no focus trap/restore; role=menu combobox, no arrow keys; typed.js in aria-live. → harden
[P2] Reading typography — text-justify on monospace (BaseCard.vue:86, my-skills.vue:95,132,169); no max line length; label→sb-overline 12px uppercase; consent 12px italic. Fix: text-left, max-w-[68ch], label→sb-label. → typeset
[P2] Contrast & palette drift — text-ink on bg-primary in BaseTabs.vue:51 + TheHeader.vue:198 (migration gap); active nav text-primary on surface-2 4.24:1; input border 1.09:1; info-soft card; gold hexes. → colorize, polish

## Persona Red Flags
Jordan: Welcome Back; name below fold; no projects on home; icon-only project actions; jargon tab; IT title in EN.
Sam: unnamed lang/close/pagination; double Escape; focus to BODY; EN aria strings in IT; mute skill level; consent error unannounced; typed text spelled out.
Casey: drawer from left vs hamburger right; 28px lang icon; 18px checkbox; 12px legal links; CTA wraps; justified rivers.

## Minor
error.vue hardcoded EN + JSON dump; my-projects tab labels + zod messages not reactive to locale; solar system no reduced-motion guard; hero banding + alt="Hero"; footer double padding; BaseButton link forces _blank; stray space before comma; unlocalized dates; hover variants on non-interactive cards; 7s toast.

## Questions
Recruiter's 7 seconds on "Welcome Back"? Lead home with real client work? Solar system as skills navigation? Freelance clients or employers?
