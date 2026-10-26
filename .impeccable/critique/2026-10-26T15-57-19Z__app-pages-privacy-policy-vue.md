---
target: privacy policy e terms and conditions
total_score: 13
max_score: 32
na_heuristics: 5,9
p0_count: 0
p1_count: 4
target_identity: "file:/Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/privacy-policy.vue"
target_fingerprint: "sha256:9b85c03c331da60e28ba50f59bb78abce253f5c5c78156d08f9cac7bc1c2e96d"
target_path: /Users/stefanobiddau/Desktop/coding/stefano-biddau-portfolio/app/pages/privacy-policy.vue
timestamp: 2026-10-26T15-57-19Z
slug: app-pages-privacy-policy-vue
---
# Critique: Privacy Policy + Terms and Conditions (EN/IT, 390/820/1280)

Method: dual-agent (A: design review, B: detector + browser)

## Heuristics (13/32, Poor, 41%; n/a: 5, 9)
1 Visibility 2 (hardcoded date 2025-11-18 vs sitemap lastmod 2026-04-12; no position in 7-screen doc)
2 Real world 2 (generic legalese; IT voice drifts)
3 Control 2 (only exit Back to Home; no back-to-top/jumps)
4 Consistency 1 (custom header not ThePageHero; intro sb-h1 > sections sb-h3; URL uppercased via sb-overline)
5 n/a · 6 Recognition 1 (no TOC/anchors; unlinked cross-refs) · 7 Flexibility 1 (no deep links)
8 Aesthetic 2 (zebra cards; empty right third on desktop) · 9 n/a · 10 Help 2 (no plain summary)

## Specificity
Generic legal template in site fonts. Site truth (0 cookies, no analytics, self-hosted fonts, CDN images, 1 localStorage key, only EmailJS sees data) not stated. Detector: low-contrast text-ink-muted/70 12px 4.19:1 / 3.95:1 (real); unbalanced IT headings (real); justified-text on strong and footer cramped-padding (false positives).

## Priority issues
- [P1] Header off-center on desktop ([&_p]:max-w-[75ch] without mx-auto), double pt-16, hr, bypasses ThePageHero. Fix: ThePageHero + date sb-overline text-ink-muted; remove arbitrary selectors. /impeccable polish
- [P1] No in-document navigation on 6-7 screens. Fix: section ids scroll-mt-24, nav TOC sticky lg rail with active state, compact list on mobile, linkable headings. /impeccable layout
- [P1] Mobile justified 24-33 cpl: gaps 12-13x, email hyphenated, EmailJS URL uppercased, cards+indents+• eat ~9 chars. Fix: drop cards around prose, list-disc marker primary, rights term on own line, hyphens manual on links, email own line, readable EmailJS link text. /impeccable typeset
- [P1] Boilerplate/incomplete content: no Netlify, no EmailJS auto-reply disclosure, no retention period, no Garante, no EmailJS location; trust facts unstated; terms IP generic, Privacy unlinked. Fix: rewrite pages.privacy/terms EN+IT, "At a glance" block, align date. /impeccable clarify
- [P2] Dead ends: button with $router.push, goes Home not to form, no Privacy<->Terms links. Fix: NuxtLink/BaseButton link, cross-links, open shared contact form. /impeccable distill

## Persona red flags
Jordan: boilerplate before answer; Back to Home doesn't return to form. Sam: date 4.2:1; • read aloud; navigating button; raw URL read char by char; no TOC landmark. Casey: 4.7-6.4k px no TOC/back-to-top; ~24 cpl lists with rivers.

## Minor
leading-relaxed overrides sb-body; <!-- Section N --> comments; email hardcoded 3x; terms hyphen breaks con-/tent harm-/ful interferi-/re,; meta titles Full-Stack vs PRODUCT; IT meta "Privacy Policy"; www vs apex domain; IT h2 need text-balance.

## Questions
1. Make Privacy a proof piece with verified 5-line summary?
2. One "Legal" document with two anchored parts?
3. Sticky TOC as the only orange accent?
