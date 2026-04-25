# Changelog

## [1.4.5](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.4.4...v1.4.5) (2026-04-25)


### Bug Fixes

* montly checkup ([#119](https://github.com/stefanBid/stefano-biddau-portfolio/issues/119)) ([d78f4b3](https://github.com/stefanBid/stefano-biddau-portfolio/commit/d78f4b3c9fcce7d9a21e26c5d631eddc6cdb787c))

## [1.4.4](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.4.3...v1.4.4) (2026-04-12)


### Bug Fixes

* profile info ([#117](https://github.com/stefanBid/stefano-biddau-portfolio/issues/117)) ([eebd305](https://github.com/stefanBid/stefano-biddau-portfolio/commit/eebd305b7eb11783ccd8b57ab0d535ca8fa3576e))

## [1.4.4] — 2026-04-12

### Fixed
- Removed `titleTemplate` from `app/layouts/default.vue` — meta titles are now fully defined in the i18n files (`en.json` / `it.json`)
- Fixed `|` separator in meta titles using the `{'|'}` vue-i18n literal interpolation syntax (`|` is reserved as the pluralization separator)
- Removed duplicate `ogTitle` keys from i18n files — `ogTitle` and `twitterTitle` now reference `meta.*.title` (single source of truth)
- Updated `lastmod` in sitemap for all 12 URLs to `2026-04-12`
- Updated attached CV files: `Stefano_Biddau_CV.pdf`, `Stefano_Biddau_CV_en.pdf`, `Stefano_Biddau_CV_it.pdf`

### Dependencies
- `@types/node` `^25.5.2` → `^25.6.0`
- `isomorphic-dompurify` `^3.7.1` → `^3.8.0`
- `unhead` + `@unhead/vue` patched via `npm audit fix` (moderate CVE)
- `vite` patched via `npm audit fix` (high CVE — path traversal)

## [1.4.3](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.4.2...v1.4.3) (2026-04-04)


### Bug Fixes

* implement safe install script and update npm install policy ([#115](https://github.com/stefanBid/stefano-biddau-portfolio/issues/115)) ([1ddfa3f](https://github.com/stefanBid/stefano-biddau-portfolio/commit/1ddfa3fc73033cbf203c6f61259f7bd894c2f62c))

## [1.4.3] — 2026-04-04

### Fixed
- Added `scripts/safe-install.sh` — script that runs `npm ci` on `main` and `npm install` on any other branch
- Added `npm run si` script alias in `package.json` for convenient safe-install execution
- Updated AI prompt files (`check-dependencies.prompt.md`, `bump-version.prompt.md`) to use `npm run si` instead of bare `npm install`

## [1.4.2](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.4.1...v1.4.2) (2026-04-04)


### Bug Fixes

* ai prompts flux ([#113](https://github.com/stefanBid/stefano-biddau-portfolio/issues/113)) ([20abbb4](https://github.com/stefanBid/stefano-biddau-portfolio/commit/20abbb41c17a8cecd57eee637bb3306f7af78b87))

## [1.4.2] — 2026-04-04

### Changed
- Add `full-checkup.prompt.md` — new Agent-mode workflow that orchestrates
  dependencies, SEO, build and lint checks in sequence, auto-bumps version
  and optionally updates the documentation
- Add "Documentation sync — mandatory rule" to `copilot-instructions.md`:
  every change creating a discrepancy with README.md must be followed by
  a targeted documentation update in the same session
- Register `full-checkup.prompt.md` in the Available Prompts table of README.md

### Dependencies
- `eslint` updated `^10.1.0` → `^10.2.0` (minor, no breaking changes)

## [1.4.1](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.4.0...v1.4.1) (2026-04-03)


### Bug Fixes

* update URLs to remove 'www' prefix across the application ([#111](https://github.com/stefanBid/stefano-biddau-portfolio/issues/111)) ([c4d29fd](https://github.com/stefanBid/stefano-biddau-portfolio/commit/c4d29fd18b6c771da42f59100549cf599bc63755))

## [1.4.1] — 2026-04-03

### Fixed
- Remove `www.` prefix from all canonical URLs to align with the Netlify primary domain (`stefanobiddau.com`)
  — updated `nuxt.config.ts` (i18n.baseUrl, og:image, twitter:image), `public/robots.txt`,
    `public/sitemap.xml` (all 12 routes) and all 6 page `ogUrl` meta tags

## [1.4.0](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.23...v1.4.0) (2026-04-03)


### Features

* add ai code assistent ([#109](https://github.com/stefanBid/stefano-biddau-portfolio/issues/109)) ([f15364a](https://github.com/stefanBid/stefano-biddau-portfolio/commit/f15364adb92ec4a05f253ace82a9a9d7a0186cfe))

## [1.4.0] — 2026-04-03

### Features
- Add GitHub Copilot instructions and prompt workflows for AI-assisted development
  (server API, components, design system, pages, composables, project config)
- Add prompt workflows: bump-version, check-build, check-dependencies, check-gsc, check-lint, update-docs

### Changed
- Overhaul README.md with improved structure and detailed documentation sections
- Update dependencies in package.json

### Fixed
- Update README.md version badges and dependency references

### Dependencies
- Add vue-tsc as development dependency

## [1.3.23](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.22...v1.3.23) (2026-03-19)


### Bug Fixes

* update dependencies and devDependencies in package.json ([#107](https://github.com/stefanBid/stefano-biddau-portfolio/issues/107)) ([c0b1f48](https://github.com/stefanBid/stefano-biddau-portfolio/commit/c0b1f4835e8c455f5095a4c7f9ffd6325fb4a813))

## [1.3.22](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.21...v1.3.22) (2026-01-30)


### Bug Fixes

* **deps:** update dependencies to latest versions ([#104](https://github.com/stefanBid/stefano-biddau-portfolio/issues/104)) ([5a32b82](https://github.com/stefanBid/stefano-biddau-portfolio/commit/5a32b82ffca47db7e3e0e5344bcbc254ba7ba000))

## [1.3.21](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.20...v1.3.21) (2026-01-06)


### Bug Fixes

* **BaseDialog:** upgrade logic  for open/close status for a good accessibility ([#102](https://github.com/stefanBid/stefano-biddau-portfolio/issues/102)) ([4a5b129](https://github.com/stefanBid/stefano-biddau-portfolio/commit/4a5b129c9c30ec4d3860f3977084160a5b3a1029))

## [1.3.20](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.19...v1.3.20) (2025-12-29)


### Bug Fixes

* add Netlify configuration to enable proper build and deployment ([#100](https://github.com/stefanBid/stefano-biddau-portfolio/issues/100)) ([0a51f7e](https://github.com/stefanBid/stefano-biddau-portfolio/commit/0a51f7e3b2bb24a081248e2c53601f3311a29a9e))

## [1.3.19](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.18...v1.3.19) (2025-12-29)


### Bug Fixes

* handle Strapi request failures to prevent build failures ([#98](https://github.com/stefanBid/stefano-biddau-portfolio/issues/98)) ([5cb79a3](https://github.com/stefanBid/stefano-biddau-portfolio/commit/5cb79a38068242688a549f1af80d75b9edafbfaf))

## [1.3.18](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.17...v1.3.18) (2025-12-28)


### Bug Fixes

* handle null responses and increase timeout for API requests ([#96](https://github.com/stefanBid/stefano-biddau-portfolio/issues/96)) ([48cfe41](https://github.com/stefanBid/stefano-biddau-portfolio/commit/48cfe41c45e100a3029a6e3ceac87e998762243d))

## [1.3.17](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.16...v1.3.17) (2025-12-28)


### Bug Fixes

* disable lazy loading for milestones and projects ([#94](https://github.com/stefanBid/stefano-biddau-portfolio/issues/94)) ([0c7e41c](https://github.com/stefanBid/stefano-biddau-portfolio/commit/0c7e41cd03f87fc292618f1df692713f9700c936))

## [1.3.16](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.15...v1.3.16) (2025-12-28)


### Bug Fixes

* replace description with rich text ([#92](https://github.com/stefanBid/stefano-biddau-portfolio/issues/92)) ([b4b343c](https://github.com/stefanBid/stefano-biddau-portfolio/commit/b4b343c90e3bdbd16afe11ba5361f76e0129fdf6))

## [1.3.15](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.14...v1.3.15) (2025-12-24)


### Bug Fixes

* secondary variant and accent color ([#90](https://github.com/stefanBid/stefano-biddau-portfolio/issues/90)) ([d2c411f](https://github.com/stefanBid/stefano-biddau-portfolio/commit/d2c411fa643169df40fb996a95a8cb9491d694cd))

## [1.3.14](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.13...v1.3.14) (2025-12-23)


### Bug Fixes

* adjust positioning and layout of milestone expand button ([#88](https://github.com/stefanBid/stefano-biddau-portfolio/issues/88)) ([1efd747](https://github.com/stefanBid/stefano-biddau-portfolio/commit/1efd74746717621c0fddc43406623bfa918435bc))

## [1.3.13](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.12...v1.3.13) (2025-12-23)


### Bug Fixes

* update Vue badge version in README ([#86](https://github.com/stefanBid/stefano-biddau-portfolio/issues/86)) ([55d335d](https://github.com/stefanBid/stefano-biddau-portfolio/commit/55d335dc5b379581f79c488d33a1de469fa30706))

## [1.3.12](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.11...v1.3.12) (2025-12-23)


### Bug Fixes

* card ui ([#84](https://github.com/stefanBid/stefano-biddau-portfolio/issues/84)) ([f82ce72](https://github.com/stefanBid/stefano-biddau-portfolio/commit/f82ce72aaf4a5aa5c858e37ab76989a94693413c))

## [1.3.11](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.10...v1.3.11) (2025-12-15)


### Bug Fixes

* update Nuxt and TailwindCSS badge versions in README ([#82](https://github.com/stefanBid/stefano-biddau-portfolio/issues/82)) ([87e36ce](https://github.com/stefanBid/stefano-biddau-portfolio/commit/87e36ce33677600be257569e270b4444c5378121))

## [1.3.10](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.9...v1.3.10) (2025-12-15)


### Bug Fixes

* update zod dependency to version 4.2.0 ([#80](https://github.com/stefanBid/stefano-biddau-portfolio/issues/80)) ([703ce10](https://github.com/stefanBid/stefano-biddau-portfolio/commit/703ce10a622de162a452b1c030b09dd9142ead12))

## [1.3.9](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.8...v1.3.9) (2025-12-15)


### Bug Fixes

* update sbt logo image ([#78](https://github.com/stefanBid/stefano-biddau-portfolio/issues/78)) ([bc30835](https://github.com/stefanBid/stefano-biddau-portfolio/commit/bc3083576046a122ff5750829016e346855cafc3))

## [1.3.8](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.7...v1.3.8) (2025-12-14)


### Bug Fixes

* logo images ([#76](https://github.com/stefanBid/stefano-biddau-portfolio/issues/76)) ([bc3fd73](https://github.com/stefanBid/stefano-biddau-portfolio/commit/bc3fd73efbdc40f2be047811e4a1ff7fe2e2eae7))

## [1.3.7](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.6...v1.3.7) (2025-12-14)


### Bug Fixes

* update max-width classes to 350px for consistency across components ([#74](https://github.com/stefanBid/stefano-biddau-portfolio/issues/74)) ([88c562d](https://github.com/stefanBid/stefano-biddau-portfolio/commit/88c562dd4b93549c08ed7586e4c1f7cfb8c011c2))

## [1.3.6](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.5...v1.3.6) (2025-12-14)


### Bug Fixes

* general bugs ([#72](https://github.com/stefanBid/stefano-biddau-portfolio/issues/72)) ([31c0086](https://github.com/stefanBid/stefano-biddau-portfolio/commit/31c00863fd5387678d13cdf1b46dca192a4bebc7))

## [1.3.5](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.4...v1.3.5) (2025-12-14)


### Bug Fixes

* optimize image loading for hero and project logos ([#70](https://github.com/stefanBid/stefano-biddau-portfolio/issues/70)) ([b17529c](https://github.com/stefanBid/stefano-biddau-portfolio/commit/b17529c0b806cd5ca998247a767d5bef75a2e23a))

## [1.3.4](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.3...v1.3.4) (2025-12-14)


### Bug Fixes

* combobox arrow ([#68](https://github.com/stefanBid/stefano-biddau-portfolio/issues/68)) ([ac9f566](https://github.com/stefanBid/stefano-biddau-portfolio/commit/ac9f566afaa00415515d1cffe66a6e656c595292))

## [1.3.3](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.2...v1.3.3) (2025-12-04)


### Bug Fixes

* dependencies ([#66](https://github.com/stefanBid/stefano-biddau-portfolio/issues/66)) ([12bdb83](https://github.com/stefanBid/stefano-biddau-portfolio/commit/12bdb833260a6424d96562488becfbf88b396f58))

## [1.3.2](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.1...v1.3.2) (2025-12-04)


### Bug Fixes

* remove unused info notification and comment out onMounted logic ([#64](https://github.com/stefanBid/stefano-biddau-portfolio/issues/64)) ([1926b6b](https://github.com/stefanBid/stefano-biddau-portfolio/commit/1926b6b41e65b49304dcf86de0e25965fcae03d9))

## [1.3.1](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.3.0...v1.3.1) (2025-12-04)


### Bug Fixes

* add prerendering for skills and projects pages ([#62](https://github.com/stefanBid/stefano-biddau-portfolio/issues/62)) ([9a28d43](https://github.com/stefanBid/stefano-biddau-portfolio/commit/9a28d431670656bf86023085b4391dea93b6ca1e))

## [1.3.0](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.2.1...v1.3.0) (2025-12-04)


### Features

* create projects page ([#60](https://github.com/stefanBid/stefano-biddau-portfolio/issues/60)) ([7744215](https://github.com/stefanBid/stefano-biddau-portfolio/commit/77442150438c5332a7fa1dadec102c8e38bc4eff))

## [1.2.1](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.2.0...v1.2.1) (2025-12-01)


### Bug Fixes

* general improvements ([#58](https://github.com/stefanBid/stefano-biddau-portfolio/issues/58)) ([eaa5bf4](https://github.com/stefanBid/stefano-biddau-portfolio/commit/eaa5bf408a3dc30a45c3e05509a97a1f806f5e81))

## [1.2.0](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.1.12...v1.2.0) (2025-12-01)


### Features

* add skills page with localization and SEO metadata ([#56](https://github.com/stefanBid/stefano-biddau-portfolio/issues/56)) ([fe83039](https://github.com/stefanBid/stefano-biddau-portfolio/commit/fe8303949d351cba348d1538436b3b6f4f66390f))

## [1.1.12](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.1.11...v1.1.12) (2025-11-27)


### Bug Fixes

* hydratation language missmatch ([#54](https://github.com/stefanBid/stefano-biddau-portfolio/issues/54)) ([c75d4c4](https://github.com/stefanBid/stefano-biddau-portfolio/commit/c75d4c4a4aafb00803637c3a684269fa419ac27f))

## [1.1.11](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.1.10...v1.1.11) (2025-11-27)


### Bug Fixes

* semantik ([#52](https://github.com/stefanBid/stefano-biddau-portfolio/issues/52)) ([3cb637c](https://github.com/stefanBid/stefano-biddau-portfolio/commit/3cb637c18c9cbe2b37c74e7729b0a23ffa8ec0b2))

## [1.1.10](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.1.9...v1.1.10) (2025-11-27)


### Bug Fixes

* update favicon format from SVG to ICO ([#49](https://github.com/stefanBid/stefano-biddau-portfolio/issues/49)) ([4346557](https://github.com/stefanBid/stefano-biddau-portfolio/commit/434655771a19d54f2c9687f98afbb53c59a05ee0))

## [1.1.9](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.1.8...v1.1.9) (2025-11-27)


### Bug Fixes

* website optimization ([#47](https://github.com/stefanBid/stefano-biddau-portfolio/issues/47)) ([05aa1ff](https://github.com/stefanBid/stefano-biddau-portfolio/commit/05aa1ff3ec277c8ef54cdf29bd1a68ad1eae4ce9))

## [1.1.8](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.1.7...v1.1.8) (2025-11-24)


### Bug Fixes

* ssr bug ([#45](https://github.com/stefanBid/stefano-biddau-portfolio/issues/45)) ([029e8c8](https://github.com/stefanBid/stefano-biddau-portfolio/commit/029e8c84263a6ec215db63d0aeef952d413c3a61))

## [1.1.7](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.1.6...v1.1.7) (2025-11-24)


### Bug Fixes

* composables structure ([#43](https://github.com/stefanBid/stefano-biddau-portfolio/issues/43)) ([653f8c2](https://github.com/stefanBid/stefano-biddau-portfolio/commit/653f8c218f996dd4949cb91d2072e6f99b7cc07d))

## [1.1.6](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.1.5...v1.1.6) (2025-11-24)


### Bug Fixes

* ui general ([#41](https://github.com/stefanBid/stefano-biddau-portfolio/issues/41)) ([2323595](https://github.com/stefanBid/stefano-biddau-portfolio/commit/23235959981d36fa54106a6b8975f5dbb6842b3e))

## [1.1.5](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.1.4...v1.1.5) (2025-11-23)


### Bug Fixes

* add lockScroll prop to ThePageHero component for scroll control ([#39](https://github.com/stefanBid/stefano-biddau-portfolio/issues/39)) ([5dc6b32](https://github.com/stefanBid/stefano-biddau-portfolio/commit/5dc6b32edf39011f990b7df99ac12bc1baef19cb))

## [1.1.4](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.1.3...v1.1.4) (2025-11-23)


### Bug Fixes

* general improvements ([#37](https://github.com/stefanBid/stefano-biddau-portfolio/issues/37)) ([8f83d8c](https://github.com/stefanBid/stefano-biddau-portfolio/commit/8f83d8c836cbc89a07874af93017a73409e79166))

## [1.1.3](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.1.2...v1.1.3) (2025-11-23)


### Bug Fixes

* update lastmod dates and hreflang attributes in sitemap.xml ([#35](https://github.com/stefanBid/stefano-biddau-portfolio/issues/35)) ([884faf1](https://github.com/stefanBid/stefano-biddau-portfolio/commit/884faf1a5fd3b76f94a5560ecadf63c4bb40e769))

## [1.1.2](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.1.1...v1.1.2) (2025-11-23)


### Bug Fixes

* improve SSR safety for notifications handling ([#33](https://github.com/stefanBid/stefano-biddau-portfolio/issues/33)) ([ece940c](https://github.com/stefanBid/stefano-biddau-portfolio/commit/ece940cc5db730ef575d9a49b39e92f152212c48))

## [1.1.1](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.1.0...v1.1.1) (2025-11-23)


### Bug Fixes

* ssr problems ([#31](https://github.com/stefanBid/stefano-biddau-portfolio/issues/31)) ([ba2b416](https://github.com/stefanBid/stefano-biddau-portfolio/commit/ba2b4160bc675f070c2a27496e34cab3bed9c0e3))

## [1.1.0](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.0.9...v1.1.0) (2025-11-23)


### Features

* Add About Me page ([#29](https://github.com/stefanBid/stefano-biddau-portfolio/issues/29)) ([f51a4f7](https://github.com/stefanBid/stefano-biddau-portfolio/commit/f51a4f76bcc9a7fdf8be44c3410fb128a6004008))


### Bug Fixes

* handle fetch errors for milestones and display notifications ([f51a4f7](https://github.com/stefanBid/stefano-biddau-portfolio/commit/f51a4f76bcc9a7fdf8be44c3410fb128a6004008))

## [1.0.9](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.0.8...v1.0.9) (2025-11-21)


### Bug Fixes

* remove dev page ([#27](https://github.com/stefanBid/stefano-biddau-portfolio/issues/27)) ([74888c0](https://github.com/stefanBid/stefano-biddau-portfolio/commit/74888c0071c94aee54740896c4ab91f0bc47c0d5))

## [1.0.8](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.0.7...v1.0.8) (2025-11-20)


### Bug Fixes

* simplify event handling for closing header drawer ([#25](https://github.com/stefanBid/stefano-biddau-portfolio/issues/25)) ([2275a12](https://github.com/stefanBid/stefano-biddau-portfolio/commit/2275a121c28e8b62f8c2d2b7bef5f974fac26275))

## [1.0.7](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.0.6...v1.0.7) (2025-11-20)


### Bug Fixes

* update type definitions for MenuItem and replace LangItem references ([#23](https://github.com/stefanBid/stefano-biddau-portfolio/issues/23)) ([043f9b3](https://github.com/stefanBid/stefano-biddau-portfolio/commit/043f9b326c158e94e3e364633c6fdeb4874965ca))

## [1.0.6](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.0.5...v1.0.6) (2025-11-19)


### Bug Fixes

* enhance CI workflow to detect and skip builds for release-please pull requests ([ba45a6a](https://github.com/stefanBid/stefano-biddau-portfolio/commit/ba45a6af53471b9417765298470c0a18ea0d8e41))

## [1.0.5](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.0.4...v1.0.5) (2025-11-19)


### Bug Fixes

* add minimum height to subtitle paragraph in home page ([#20](https://github.com/stefanBid/stefano-biddau-portfolio/issues/20)) ([42cb2ab](https://github.com/stefanBid/stefano-biddau-portfolio/commit/42cb2ab86856b88b8101dad19e5714c830bacbae))

## [1.0.4](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.0.3...v1.0.4) (2025-11-19)


### Bug Fixes

* update CI workflow to include additional branches and disable sourcemaps in Nuxt config ([73c40c4](https://github.com/stefanBid/stefano-biddau-portfolio/commit/73c40c4d6e80f62fc8d12cc5c24d1f414dba61c3))

## [1.0.3](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.0.2...v1.0.3) (2025-11-19)


### Bug Fixes

* update glob package to version 10.5.0 ([bae4e79](https://github.com/stefanBid/stefano-biddau-portfolio/commit/bae4e79575fcbbf05dc6eec43eb2db3503875a29))

## [1.0.2](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.0.1...v1.0.2) (2025-11-19)


### Bug Fixes

* ensure version field is consistently defined in package-lock.json ([19162db](https://github.com/stefanBid/stefano-biddau-portfolio/commit/19162db3a13db736ebb0c254e419295ca5a2677f))

## [1.0.1](https://github.com/stefanBid/stefano-biddau-portfolio/compare/v1.0.0...v1.0.1) (2025-11-19)


### Bug Fixes

* update CI workflow to specify branches for push and pull_request events; add Release Please workflow ([253d59a](https://github.com/stefanBid/stefano-biddau-portfolio/commit/253d59ab55ace75bfff84b9ffb5c3489cd251906))
* update release-please action to use googleapis instead of google-github-actions ([cbe38ce](https://github.com/stefanBid/stefano-biddau-portfolio/commit/cbe38cea0a91f4341dab9dc73c6a1b2f9b3e205b))
