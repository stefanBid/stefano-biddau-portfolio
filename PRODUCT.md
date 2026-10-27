# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two primary audiences, weighted equally (confirmed 2026-10-23):

- **Tech recruiters / HR** — scan quickly to judge stack, seniority and real output, then download the CV or get in touch.
- **Freelance clients** (small businesses, individuals) — look for real shipped work and enough trust to start a conversation.

Both arrive mostly on the home page; most decide within a short scroll whether to go deeper (Projects, Skills, About) or act (contact form, CV).

## Product Purpose

Personal portfolio of Stefano Biddau, front-end developer and web designer. It exists to turn a visit into a contact or a CV download, by proving skill through real work, a declared stack, and a professional path. Success: visitor contacts Stefano or downloads the CV.

## Positioning

A front-end developer who also designs: the site itself is the portfolio piece (accessible, fast, bilingual, hand-built design system). Shipped work includes a client site (Romano), an open-source Vue library (sb-floating-panel-vue) and open-source starter templates (SB Templates: Nuxt, Astro, Flutter).

## Operating Context

- Bilingual: English (default) and Italian; every string exists in both.
- Fully static (SSG on Netlify): content is fixed at build time; no backend, no CMS.
- Contact goes through an in-page form (EmailJS); CV is a downloadable PDF per locale.

## Capabilities and Constraints

- Pages: Home, About Me (career milestones), Skills (by area and tier), Projects (+ SB Templates), Privacy, Terms.
- Skills are a local curated list grouped by area (frontend, backend, tools) and tier: core (gold, every day), solid (used across many projects), familiar (studied or used rarely). No numeric self-ratings on the page.
- External data is acceptable only when resolved at build time (decided for GitHub stats, 2026-10-23).
- Always dark; no light theme.

## Brand Commitments

- Incumbent identity is binding: dark ground, orange primary, Bebas Neue display + Space Mono body, 3D avatar illustrations, gold treatment for core-tier skills.
- Voice: first person, direct, plain; no hype.

## Evidence on Hand

- Projects with cover images: `public/images/projects/`; SB Templates logos: `public/images/sbt-logos/`.
- Career milestones (UNISA 2018, SI2001 internship 2022, SI2001 permanent 2023) in i18n `pages.about.milestones`, with photos in `public/images/milestones/`.
- 3D avatar poses: `public/images/3d-avatar/`.
- GitHub profile `stefanBid` (public repos, stars, account age available from the public API).
- Absent, must not be fabricated: testimonials, client logos beyond real projects, years-of-experience claims, metrics not backed by a source.

## Product Principles

1. Prove, don't claim: every statement points to real work, real data, or a page that shows it.
2. Both audiences in one path: fast scan for recruiters, trust-building depth for clients, without separate funnels.
3. Static and fast: anything dynamic is resolved at build time.
4. Every page leads somewhere: a next page or the contact/CV action.

## Accessibility & Inclusion

Existing commitments: WCAG AA contrast (orange text via `primary-ink`), visible focus, `prefers-reduced-motion` respected (typed text, motion tokens), screen-reader text for animated content.
