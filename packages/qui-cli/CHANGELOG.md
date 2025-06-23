# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [2.1.6](https://github.com/battis/qui-cli/compare/qui-cli/2.1.5...qui-cli/2.1.6) (2025-06-23)


### Bug Fixes

* update peer dependency versions to minimum viable ([a776908](https://github.com/battis/qui-cli/commit/a7769085adef6da665da7a67cb143af1e0bba6be))

## [2.1.5](https://github.com/battis/qui-cli/compare/qui-cli/2.1.4...qui-cli/2.1.5) (2025-06-23)

## [2.1.4](https://github.com/battis/qui-cli/compare/qui-cli/2.1.3...qui-cli/2.1.4) (2025-06-18)

## [2.1.3](https://github.com/battis/qui-cli/compare/qui-cli/2.1.2...qui-cli/2.1.3) (2025-03-21)

### Bug Fixes

- **env:** add @battis/qui-cli.root to plugin chain ([23b0af8](https://github.com/battis/qui-cli/commit/23b0af8701317fe4b86cd49a0fe62258e51ffbe6))

## [2.1.2](https://github.com/battis/qui-cli/compare/qui-cli/2.1.1...qui-cli/2.1.2) (2025-03-07)

### Features

- **log:** Log.syntaxColor() to ANSI color an object for output ([211f091](https://github.com/battis/qui-cli/commit/211f091c00c945a4d99cf5216b6c06bad978dc30))

## [2.1.1](https://github.com/battis/qui-cli/compare/qui-cli/2.1.0...qui-cli/2.1.1) (2025-03-01)

### Bug Fixes

- **qui-cli:** missing plugin dependency ([17a1e2f](https://github.com/battis/qui-cli/commit/17a1e2f511d0c9e638a38db006ec29f66c62342a))

## [2.1.0](https://github.com/battis/qui-cli/compare/qui-cli/2.0.4...qui-cli/2.1.0) (2025-02-28)

### Features

- **qui-cli.plugin:** detect circular plugin dependencies ([3b6fd72](https://github.com/battis/qui-cli/commit/3b6fd7239b3e239324a317c4536bafbe0a49ccff))
- **qui-cli.plugin:** ExpectedArguments ([057bc5c](https://github.com/battis/qui-cli/commit/057bc5c4f1b0b55d51a2fe3bb8e9cd14ea731b05))
- **qui-cli.plugin:** expose Plugin.AccumulatedResults ([fb18e58](https://github.com/battis/qui-cli/commit/fb18e58adf3fa0439ebc46a2bb521ce625c00fd6))
- **qui-cli.plugin:** run() hook ([ce67be9](https://github.com/battis/qui-cli/commit/ce67be9cddb1db23d351966f48f652d44f95894b))
- **qui-cli.core:** run() ([a2c5ba2](https://github.com/battis/qui-cli/commit/a2c5ba2f8de6c52a88c1cf75ac37f93b51fb8211))

## [2.0.4](https://github.com/battis/qui-cli/compare/qui-cli/2.0.3...qui-cli/2.0.4) (2025-02-27)

### Bug Fixes

- **qui-cli.root:** actually default cwd to true ([c774f6b](https://github.com/battis/qui-cli/commit/c774f6ba708ffc5a78f653df47de523834000d66))

## [2.0.3](https://github.com/battis/qui-cli/compare/qui-cli/2.0.2...qui-cli/2.0.3) (2025-02-27)

### Bug Fixes

- **qui-cli.env:** allow creation of new .env file if not present ([c7fd3e3](https://github.com/battis/qui-cli/commit/c7fd3e35653efd1157c8ebc0e72da370561f0a92))

## [2.0.2](https://github.com/battis/qui-cli/compare/qui-cli/2.0.1...qui-cli/2.0.2) (2025-02-24)

- bump @battis/qui-cli.env to 2.0.2

## [2.0.1](https://github.com/battis/qui-cli/compare/qui-cli/2.0.0...qui-cli/2.0.1) (2025-02-23)

- more flexible peer dependencies internally

## [2.0.0](https://github.com/battis/qui-cli/compare/qui-cli/1.0.0...qui-cli/2.0.0) (2025-02-23)

### ⚠ BREAKING CHANGES

- **qui-cli.core:** nest core config under core key
- **qui-cli.core:** async hooks

## [1.0.0](https://github.com/battis/qui-cli/compare/qui-cli/0.9.9...qui-cli/1.0.0) (2025-02-21)

### ⚠ BREAKING CHANGES

- **qui-cli:** reimplemented as ESM modules

### Features

- **qui-cli:** configurable plugins ([730d54e](https://github.com/battis/qui-cli/commit/730d54e1595ff63fecb41bcecc0df81d10119a88))
- **qui-cli:** reimplemented as ESM modules ([d345333](https://github.com/battis/qui-cli/commit/d34533307b3ebd46dddc1d7d14824aba505be97c))

### Bug Fixes

- **qui-cli,qui-cli.core:** auto-configure on init ([37bb1c3](https://github.com/battis/qui-cli/commit/37bb1c3b49e6ee9e698d42f1e8d20da380f14636))
- **qui-cli:** progress plugin restored ([a1cf91a](https://github.com/battis/qui-cli/commit/a1cf91a1e0ea0e2a5b367a256c2e5268da6ae722))

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

- **qui-cli:** actually export register0 ([c6fed7e](https://github.com/battis/qui-cli/commit/c6fed7e38068c47edf4bb623b14cff027abaa186))

## [0.9.2](https://github.com/battis/qui-cli/compare/qui-cli/0.9.1...qui-cli/0.9.2) (2025-02-08)

### Features

- **qui-cli:** register() plugins ([9cb496f](https://github.com/battis/qui-cli/commit/9cb496f0522012262a22f6c81495f7d43561b32a))

## [0.9.1](https://github.com/battis/qui-cli/compare/qui-cli/0.9.0...qui-cli/0.9.1) (2025-01-15)

## [0.9.0](https://github.com/battis/qui-cli/compare/qui-cli/0.8.5...qui-cli/0.9.0) (2025-01-15)

### ⚠ BREAKING CHANGES

- **qui-cli:** remove spinner()

### Features

- **qui-cli:** add progress() ([a7bf810](https://github.com/battis/qui-cli/commit/a7bf8108e284a64df236940305426a6b14ae059b))
- **qui-cli:** remove spinner() ([7905bad](https://github.com/battis/qui-cli/commit/7905bad6e79328772191b7182083b06f8ebea6cd))

## 0.8.5

### Patch Changes

- Updated dependencies [75a0c50]
  - @battis/qui-cli.shell@0.8.3

## 0.8.4

### Patch Changes

- Updated dependencies [ad6edd4]
  - @battis/qui-cli.core@0.8.4

## 0.8.3

### Patch Changes

- 6badb2b: fix(?) incompatibility with v0.7.x scripts
- Updated dependencies [6badb2b]
  - @battis/qui-cli.core@0.8.3
  - @battis/qui-cli.env@0.8.2
  - @battis/qui-cli.log@0.8.2
  - @battis/qui-cli.plugin@0.1.2
  - @battis/qui-cli.shell@0.8.2
  - @battis/qui-cli.colors@0.8.2
  - @battis/qui-cli.root@0.8.2
  - @battis/qui-cli.validators@0.8.2

## 0.8.2

### Patch Changes

- a259210: fix init (with janky literals)
- Updated dependencies [a259210]
  - @battis/qui-cli.log@0.8.1
  - @battis/qui-cli.plugin@0.1.1
  - @battis/qui-cli.shell@0.8.1
  - @battis/qui-cli.colors@0.8.1
  - @battis/qui-cli.core@0.8.2
  - @battis/qui-cli.env@0.8.1
  - @battis/qui-cli.root@0.8.1
  - @battis/qui-cli.validators@0.8.1

## 0.8.1

### Patch Changes

- ab8ce9f: fix args
- Updated dependencies [ab8ce9f]
  - @battis/qui-cli.core@0.8.1

## 0.8.0

### Minor Changes

- 97d48ef: refactored for plugin architecture

### Patch Changes

- Updated dependencies [97d48ef]
  - @battis/qui-cli.colors@0.8.0
  - @battis/qui-cli.core@0.8.0
  - @battis/qui-cli.env@0.8.0
  - @battis/qui-cli.log@0.8.0
  - @battis/qui-cli.plugin@0.1.0
  - @battis/qui-cli.root@0.8.0
  - @battis/qui-cli.shell@0.8.0
  - @battis/qui-cli.validators@0.8.0

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
