# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [5.0.4](https://github.com/battis/qui-cli/compare/qui-cli/5.0.3...qui-cli/5.0.4) (2026-01-18)


### Bug Fixes

* compile against Node.js v24 ([7b06b4f](https://github.com/battis/qui-cli/commit/7b06b4f4ac4f9688719041ab8b1d837b3a0ee214))

## [5.0.3](https://github.com/battis/qui-cli/compare/qui-cli/5.0.2...qui-cli/5.0.3) (2026-01-02)

### Features

* **shell@3.1.0** disable/enable logging of commands ([d8b6f14](https://github.com/battis/qui-cli/commit/d8b6f14a7ba2452735940a26364426226dca05a5))
* **colors@3.2.0** add highlighting options for paths and commands ([e64a88e](https://github.com/battis/qui-cli/commit/e64a88e8a2c38fe485fa2527fe5c3953dce4b950))

### Bug Fixes

* normalize peer dependencies ([cdd81b7](https://github.com/battis/qui-cli/commit/cdd81b7c4bea7c769021ff58177750c5a1369f76))


## [5.0.2](https://github.com/battis/qui-cli/compare/qui-cli/5.0.1...qui-cli/5.0.2) (2025-11-12)

### Bug Fixes

- **log@4.0.1** boost standard headig back to level 1 ([cfb3065](https://github.com/battis/qui-cli/commit/cfb30657a3d719df60663d0a8e6aa6cf240740e9))

## [5.0.1](https://github.com/battis/qui-cli/compare/qui-cli/5.0.0...qui-cli/5.0.1) (2025-11-08)

### Bug Fixes

- remove all ambiguity from peer dependencies ([ced3fac](https://github.com/battis/qui-cli/commit/ced3faced1bc340457ca43e3be11afa3933b6d72))

## [5.0.0](https://github.com/battis/qui-cli/compare/qui-cli/4.0.3...qui-cli/5.0.0) (2025-11-07)

### ⚠ BREAKING CHANGES

- group arguments by plugin in usage
- **plugin@4.0.0** auto-document default arg values

### revert

- group arguments by plugin in usage ([ec3d4bf](https://github.com/battis/qui-cli/commit/ec3d4bf6ef9c59a6da3ede8603554d2dcd2581ad))
- **plugin@4.0.0** auto-document default arg values ([e01e157](https://github.com/battis/qui-cli/commit/e01e157f06a3a801628ca79366e3f0060be2322e))

## [4.0.3](https://github.com/battis/qui-cli/compare/qui-cli/4.0.2...qui-cli/4.0.3) (2025-11-04)

### Features

- **core@4.1.0** support scripting markdown documentation for commands ([03ee6d5](https://github.com/battis/qui-cli/commit/03ee6d55f86f6d7b45bd205896cb0fb6a21523b5))
- **env@4.1.0**, **log@3.1.0** standardize on modules labeling the options that they add to the usage man page ([eba86cd](https://github.com/battis/qui-cli/commit/eba86cd8a22a93aa6b6f19a3979272d87fe59274))

## [4.0.2](https://github.com/battis/qui-cli/compare/qui-cli/4.0.1...qui-cli/4.0.2) (2025-08-04)

### Bug Fixes

- **log@3.0.1:** update lagging peer dependency specs ([c6d2d4d](https://github.com/battis/qui-cli/commit/c6d2d4d141fc9a9389648d6cb2cab4bfc05f9e55))

## [4.0.1](https://github.com/battis/qui-cli/compare/qui-cli/4.0.0...qui-cli/4.0.1) (2025-08-04)

### Bug Fixes

- update lagging peer dependency specs ([30c0c27](https://github.com/battis/qui-cli/commit/30c0c279d4247a69a30efef8a7426442752cd9c0))

## [4.0.0](https://github.com/battis/qui-cli/compare/qui-cli/3.2.0...qui-cli/4.0.0) (2025-08-02)

### ⚠ BREAKING CHANGES

- rename @battis/qui-cli --> @qui-cli/qui-cli

- rename @battis/qui-cli --> @qui-cli/qui-cli ([33ecee6](https://github.com/battis/qui-cli/commit/33ecee6f3e6d4f14460d715de5936cebda5b9d65))

### Bug Fixes

- update dependencies to renamed @qui-cli/colors ([ff80e86](https://github.com/battis/qui-cli/commit/ff80e8625ef98834afdf04e57bfedb1906834e2b))
- update dependencies to renamed @qui-cli/core ([f834c5a](https://github.com/battis/qui-cli/commit/f834c5a475f908585f1e17865917a092516168a0))
- update dependencies to renamed @qui-cli/env ([5ff9ee8](https://github.com/battis/qui-cli/commit/5ff9ee844222dc4c73fd8cbdbfeaaa16541a158b))
- update dependencies to renamed @qui-cli/log ([1c8f0fb](https://github.com/battis/qui-cli/commit/1c8f0fbd5561b4274032382c5d10d33912956e7f))
- update dependencies to renamed @qui-cli/plugin ([117ea85](https://github.com/battis/qui-cli/commit/117ea85256ec69c807c5b56293546d9c350fd43f))
- update dependencies to renamed @qui-cli/progress ([4b7e4e1](https://github.com/battis/qui-cli/commit/4b7e4e1010e3cabaa4e06d328b1402c3fcc19a7f))
- update dependencies to renamed @qui-cli/root ([488daa7](https://github.com/battis/qui-cli/commit/488daa7a82730125481945b5eb8db960972ac225))
- update dependencies to renamed @qui-cli/shell ([906bc22](https://github.com/battis/qui-cli/commit/906bc22776f1c96e4215d7aa509820f27a9de3ab))
- update dependencies to renamed @qui-cli/validators ([93bf6d8](https://github.com/battis/qui-cli/commit/93bf6d8d371598df6b28974fbb45a00aa63b655d))

## [3.2.0](https://github.com/battis/qui-cli/compare/qui-cli/3.1.1...qui-cli/3.2.0) (2025-08-01)

### Features

- **core@3.1.0** present usage information in order defined in options() hook ([f470d07](https://github.com/battis/qui-cli/commit/f470d07ed27a9c774d5622641a385e62e37bde80))

### Bug Fixes

- update export strategy so that CLI matches Core behavior ([7b63175](https://github.com/battis/qui-cli/commit/7b63175a9d07ddfd014a8e0f3bb137f5ae2411db))

## [3.1.1](https://github.com/battis/qui-cli/compare/qui-cli/3.1.0...qui-cli/3.1.1) (2025-07-31)

### Bug Fixes

- **env@3.1.2** parse (and optionally load) .env file in init() lifecycle hook ([404a081](https://github.com/battis/qui-cli/commit/404a0817170f35d49e187013d237e93bdaa3f37b))
- **env@3.1.2** restructure OP to properly extend Env rather than depend on it ([3661843](https://github.com/battis/qui-cli/commit/36618439d541d31388ef70ee776647ad7562c0ef))
- **env@3.1.1** 1Password is dependency, not peer ([26ef8a5](https://github.com/battis/qui-cli/commit/26ef8a589d87da4dfa90f74c898b09fb77b2e7ed))

## [3.1.0](https://github.com/battis/qui-cli/compare/qui-cli/3.0.4...qui-cli/3.1.0) (2025-07-15)

- **env@3.1.0** remove 1Password from Env, set up as separate plugin ([c2939d6](https://github.com/battis/qui-cli/commit/c2939d69badbd8aef2678c70997aee317fc365d9))

## [3.0.4](https://github.com/battis/qui-cli/compare/qui-cli/3.0.3...qui-cli/3.0.4) (2025-07-10)

### Bug Fixes

- more specific peer dependencies ([45572ab](https://github.com/battis/qui-cli/commit/45572abc2b9fbc7c0c0db95858a0969b101c6398))

## [3.0.3](https://github.com/battis/qui-cli/compare/qui-cli/3.0.2...qui-cli/3.0.3) (2025-07-10)

## [3.0.2](https://github.com/battis/qui-cli/compare/qui-cli/3.0.1...qui-cli/3.0.2) (2025-07-09)

### Features

- optional support for 1Password secret references in .env ([169fa3a](https://github.com/battis/qui-cli/commit/169fa3adbdafd3180ea3a9894a3695e6b0c846e4))

## [3.0.1](https://github.com/battis/qui-cli/compare/qui-cli/3.0.0...qui-cli/3.0.1) (2025-07-04)

### Bug Fixes

- @qui-cli/core@3.x ([5a2fe14](https://github.com/battis/qui-cli/commit/5a2fe14570ee1763d30656f9a0d2cb433559b969))

## [3.0.0](https://github.com/battis/qui-cli/compare/qui-cli/2.1.6...qui-cli/3.0.0) (2025-06-28)

Updating dependencies to @qui-cli/core@3.x

## [2.1.6](https://github.com/battis/qui-cli/compare/qui-cli/2.1.5...qui-cli/2.1.6) (2025-06-23)

### Bug Fixes

- update peer dependency versions to minimum viable ([a776908](https://github.com/battis/qui-cli/commit/a7769085adef6da665da7a67cb143af1e0bba6be))

## [2.1.5](https://github.com/battis/qui-cli/compare/qui-cli/2.1.4...qui-cli/2.1.5) (2025-06-23)

## [2.1.4](https://github.com/battis/qui-cli/compare/qui-cli/2.1.3...qui-cli/2.1.4) (2025-06-18)

## [2.1.3](https://github.com/battis/qui-cli/compare/qui-cli/2.1.2...qui-cli/2.1.3) (2025-03-21)

### Bug Fixes

- **env:** add @qui-cli/root to plugin chain ([23b0af8](https://github.com/battis/qui-cli/commit/23b0af8701317fe4b86cd49a0fe62258e51ffbe6))

## [2.1.2](https://github.com/battis/qui-cli/compare/qui-cli/2.1.1...qui-cli/2.1.2) (2025-03-07)

### Features

- **log:** Log.syntaxColor() to ANSI color an object for output ([211f091](https://github.com/battis/qui-cli/commit/211f091c00c945a4d99cf5216b6c06bad978dc30))

## [2.1.1](https://github.com/battis/qui-cli/compare/qui-cli/2.1.0...qui-cli/2.1.1) (2025-03-01)

### Bug Fixes

- missing plugin dependency ([17a1e2f](https://github.com/battis/qui-cli/commit/17a1e2f511d0c9e638a38db006ec29f66c62342a))

## [2.1.0](https://github.com/battis/qui-cli/compare/qui-cli/2.0.4...qui-cli/2.1.0) (2025-02-28)

### Features

- **plugin:** detect circular plugin dependencies ([3b6fd72](https://github.com/battis/qui-cli/commit/3b6fd7239b3e239324a317c4536bafbe0a49ccff))
- **plugin:** ExpectedArguments ([057bc5c](https://github.com/battis/qui-cli/commit/057bc5c4f1b0b55d51a2fe3bb8e9cd14ea731b05))
- **plugin:** expose Plugin.AccumulatedResults ([fb18e58](https://github.com/battis/qui-cli/commit/fb18e58adf3fa0439ebc46a2bb521ce625c00fd6))
- **plugin:** run() hook ([ce67be9](https://github.com/battis/qui-cli/commit/ce67be9cddb1db23d351966f48f652d44f95894b))
- **core:** run() ([a2c5ba2](https://github.com/battis/qui-cli/commit/a2c5ba2f8de6c52a88c1cf75ac37f93b51fb8211))

## [2.0.4](https://github.com/battis/qui-cli/compare/qui-cli/2.0.3...qui-cli/2.0.4) (2025-02-27)

### Bug Fixes

- **root:** actually default cwd to true ([c774f6b](https://github.com/battis/qui-cli/commit/c774f6ba708ffc5a78f653df47de523834000d66))

## [2.0.3](https://github.com/battis/qui-cli/compare/qui-cli/2.0.2...qui-cli/2.0.3) (2025-02-27)

### Bug Fixes

- **env:** allow creation of new .env file if not present ([c7fd3e3](https://github.com/battis/qui-cli/commit/c7fd3e35653efd1157c8ebc0e72da370561f0a92))

## [2.0.2](https://github.com/battis/qui-cli/compare/qui-cli/2.0.1...qui-cli/2.0.2) (2025-02-24)

- bump @qui-cli/env to 2.0.2

## [2.0.1](https://github.com/battis/qui-cli/compare/qui-cli/2.0.0...qui-cli/2.0.1) (2025-02-23)

- more flexible peer dependencies internally

## [2.0.0](https://github.com/battis/qui-cli/compare/qui-cli/1.0.0...qui-cli/2.0.0) (2025-02-23)

### ⚠ BREAKING CHANGES

- **core:** nest core config under core key
- **core:** async hooks

## [1.0.0](https://github.com/battis/qui-cli/compare/qui-cli/0.9.9...qui-cli/1.0.0) (2025-02-21)

### ⚠ BREAKING CHANGES

- reimplemented as ESM modules

### Features

- configurable plugins ([730d54e](https://github.com/battis/qui-cli/commit/730d54e1595ff63fecb41bcecc0df81d10119a88))
- reimplemented as ESM modules ([d345333](https://github.com/battis/qui-cli/commit/d34533307b3ebd46dddc1d7d14824aba505be97c))

### Bug Fixes

- **core:** auto-configure on init ([37bb1c3](https://github.com/battis/qui-cli/commit/37bb1c3b49e6ee9e698d42f1e8d20da380f14636))
- progress plugin restored ([a1cf91a](https://github.com/battis/qui-cli/commit/a1cf91a1e0ea0e2a5b367a256c2e5268da6ae722))

## [0.9.9](https://github.com/battis/qui-cli/compare/qui-cli/0.9.8...qui-cli/0.9.9) (2025-02-09)

## [0.9.8](https://github.com/battis/qui-cli/compare/qui-cli/0.9.7...qui-cli/0.9.8) (2025-02-09)

## [0.9.7](https://github.com/battis/qui-cli/compare/qui-cli/0.9.6...qui-cli/0.9.7) (2025-02-09)

## [0.9.6](https://github.com/battis/qui-cli/compare/qui-cli/0.9.5...qui-cli/0.9.6) (2025-02-09)

## [0.9.5](https://github.com/battis/qui-cli/compare/qui-cli/0.9.4...qui-cli/0.9.5) (2025-02-09)

### Bug Fixes

- load _current_ appRoot() ([e9eda62](https://github.com/battis/qui-cli/commit/e9eda6267532ff998ee9c59ec3fb07ed713b7dd9))

## [0.9.4](https://github.com/battis/qui-cli/compare/qui-cli/0.9.3...qui-cli/0.9.4) (2025-02-09)

## [0.9.3](https://github.com/battis/qui-cli/compare/qui-cli/0.9.2...qui-cli/0.9.3) (2025-02-08)

### Bug Fixes

- actually export register0 ([c6fed7e](https://github.com/battis/qui-cli/commit/c6fed7e38068c47edf4bb623b14cff027abaa186))

## [0.9.2](https://github.com/battis/qui-cli/compare/qui-cli/0.9.1...qui-cli/0.9.2) (2025-02-08)

### Features

- register() plugins ([9cb496f](https://github.com/battis/qui-cli/commit/9cb496f0522012262a22f6c81495f7d43561b32a))

## [0.9.1](https://github.com/battis/qui-cli/compare/qui-cli/0.9.0...qui-cli/0.9.1) (2025-01-15)

## [0.9.0](https://github.com/battis/qui-cli/compare/qui-cli/0.8.5...qui-cli/0.9.0) (2025-01-15)

### ⚠ BREAKING CHANGES

- remove spinner()

### Features

- add progress() ([a7bf810](https://github.com/battis/qui-cli/commit/a7bf8108e284a64df236940305426a6b14ae059b))
- remove spinner() ([7905bad](https://github.com/battis/qui-cli/commit/7905bad6e79328772191b7182083b06f8ebea6cd))

## 0.8.5

### Patch Changes

- Updated dependencies [75a0c50]
  - @qui-cli/shell@0.8.3

## 0.8.4

### Patch Changes

- Updated dependencies [ad6edd4]
  - @qui-cli/core@0.8.4

## 0.8.3

### Patch Changes

- 6badb2b: fix(?) incompatibility with v0.7.x scripts
- Updated dependencies [6badb2b]
  - @qui-cli/core@0.8.3
  - @qui-cli/env@0.8.2
  - @qui-cli/log@0.8.2
  - @qui-cli/plugin@0.1.2
  - @qui-cli/shell@0.8.2
  - @qui-cli/colors@0.8.2
  - @qui-cli/root@0.8.2
  - @qui-cli/validators@0.8.2

## 0.8.2

### Patch Changes

- a259210: fix init (with janky literals)
- Updated dependencies [a259210]
  - @qui-cli/log@0.8.1
  - @qui-cli/plugin@0.1.1
  - @qui-cli/shell@0.8.1
  - @qui-cli/colors@0.8.1
  - @qui-cli/core@0.8.2
  - @qui-cli/env@0.8.1
  - @qui-cli/root@0.8.1
  - @qui-cli/validators@0.8.1

## 0.8.1

### Patch Changes

- ab8ce9f: fix args
- Updated dependencies [ab8ce9f]
  - @qui-cli/core@0.8.1

## 0.8.0

### Minor Changes

- 97d48ef: refactored for plugin architecture

### Patch Changes

- Updated dependencies [97d48ef]
  - @qui-cli/colors@0.8.0
  - @qui-cli/core@0.8.0
  - @qui-cli/env@0.8.0
  - @qui-cli/log@0.8.0
  - @qui-cli/plugin@0.1.0
  - @qui-cli/root@0.8.0
  - @qui-cli/shell@0.8.0
  - @qui-cli/validators@0.8.0

## 0.7.3

### Patch Changes

- 86c0143: missing keyword

## 0.7.2

### Patch Changes

- 896ed6e: keyword highlighting

## 0.7.1

### Patch Changes

- 1bd4e0e: updated colors

## 0.7.0

### Minor Changes

- d5c29cb: extended jackspeak options

## 0.6.3

### Patch Changes

- 22e6e85: regexp value

## 0.6.2

### Patch Changes

- fddddcd: more careful handling of undefined message

## 0.6.1

### Patch Changes

- e4ac763: undefined message

## 0.6.0

### Minor Changes

- 78f2a09: Objects sent to logs automatically stringified

## 0.5.1

### Patch Changes

- 38e585c: tweaking colors to be more consistent with default node ANSI colors

## 0.5.0

### Minor Changes

- 458c489: babel --> tsc

## 0.4.2

### Patch Changes

- b2a456e: Fix enviroment bugs

## 0.4.1

### Patch Changes

- d8b8e91: "Touch" missing .env file
