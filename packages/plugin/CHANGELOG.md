# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [2.3.0](https://github.com/battis/qui-cli/compare/plugin/2.2.0...plugin/2.3.0) (2025-03-09)


### Features

* **plugin:** Registrar.reset() ([afe8bae](https://github.com/battis/qui-cli/commit/afe8bae79b57c3f5dd1d7e3cdbda2911d35665dd))

## [2.2.0](https://github.com/battis/qui-cli/compare/plugin/2.1.0...plugin/2.2.0) (2025-02-28)


### Features

* **qui-cli.plugin:** detect circular plugin dependencies ([3b6fd72](https://github.com/battis/qui-cli/commit/3b6fd7239b3e239324a317c4536bafbe0a49ccff))
* **qui-cli.plugin:** ExpectedArguments ([057bc5c](https://github.com/battis/qui-cli/commit/057bc5c4f1b0b55d51a2fe3bb8e9cd14ea731b05))
* **qui-cli.plugin:** expose Plugin.AccumulatedResults ([fb18e58](https://github.com/battis/qui-cli/commit/fb18e58adf3fa0439ebc46a2bb521ce625c00fd6))
* **qui-cli.plugin:** run() hook ([ce67be9](https://github.com/battis/qui-cli/commit/ce67be9cddb1db23d351966f48f652d44f95894b))

## [2.1.0](https://github.com/battis/qui-cli/compare/plugin/2.0.0...plugin/2.1.0) (2025-02-23)


### Features

* **qui-cli.plugin:** list registered() plugins ([2aa8097](https://github.com/battis/qui-cli/commit/2aa8097c01a52971c21815424d9c2b8cae28b9c7))
* **qui-cli.plugin:** return registered() plugins sorted in load order ([e057251](https://github.com/battis/qui-cli/commit/e05725100c9d66dbb409657f2e8fe5f828b069df))

## [2.0.0](https://github.com/battis/qui-cli/compare/plugin/1.0.0...plugin/2.0.0) (2025-02-23)


### ⚠ BREAKING CHANGES

* **qui-cli.plugin:** async hooks

### Features

* **qui-cli.plugin:** async hooks ([8b8a1e4](https://github.com/battis/qui-cli/commit/8b8a1e48938a9be19adc700571350d04b5fc49b9))

## [1.0.0](https://github.com/battis/qui-cli/compare/plugin/0.1.2...plugin/1.0.0) (2025-02-21)


### ⚠ BREAKING CHANGES

* **qui-cli.plugin:** plugin modules and Plugin.Registrar
* **qui-cli.plugin:** merge() options

### Features

* **qui-cli.plugin:** merge() options ([a9b55c5](https://github.com/battis/qui-cli/commit/a9b55c53e7d41ffa13648765b8308046132e79d9))
* **qui-cli.plugin:** plugin modules and Plugin.Registrar ([4f95013](https://github.com/battis/qui-cli/commit/4f95013c1d21e01545346f957b87ca2d551eec77)), closes [#15](https://github.com/battis/qui-cli/issues/15)

## 0.1.2

### Patch Changes

- 6badb2b: fix(?) incompatibility with v0.7.x scripts

## 0.1.1

### Patch Changes

- a259210: fix init (with janky literals)

## 0.1.0

### Minor Changes

- 97d48ef: refactored for plugin architecture
