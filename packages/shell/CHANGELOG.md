# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [3.0.3](https://github.com/battis/qui-cli/compare/shell/3.0.2...shell/3.0.3) (2025-11-08)


### Bug Fixes

* remove all ambiguity from peer dependencies ([ced3fac](https://github.com/battis/qui-cli/commit/ced3faced1bc340457ca43e3be11afa3933b6d72))

## [3.0.2](https://github.com/battis/qui-cli/compare/shell/3.0.1...shell/3.0.2) (2025-11-08)


### Bug Fixes

* simplify peer versions ([da8823d](https://github.com/battis/qui-cli/commit/da8823d4803cd9a0875a0c6cbb3c1efee03f11dd))

## [3.0.1](https://github.com/battis/qui-cli/compare/shell/3.0.0...shell/3.0.1) (2025-08-04)


### Bug Fixes

* update lagging peer dependency specs ([30c0c27](https://github.com/battis/qui-cli/commit/30c0c279d4247a69a30efef8a7426442752cd9c0))

## [3.0.0](https://github.com/battis/qui-cli/compare/shell/2.1.2...shell/3.0.0) (2025-08-02)


### ⚠ BREAKING CHANGES

* rename @battis/qui-cli.shell --> @qui-cli/shell

* rename @battis/qui-cli.shell --> @qui-cli/shell ([d1c05ce](https://github.com/battis/qui-cli/commit/d1c05cedab55b7565ee08cf8b4d5823080b4a614))


### Bug Fixes

* @battis/qui-cli.core@3.x ([5a2fe14](https://github.com/battis/qui-cli/commit/5a2fe14570ee1763d30656f9a0d2cb433559b969))
* update dependencies to renamed @qui-cli/colors ([ff80e86](https://github.com/battis/qui-cli/commit/ff80e8625ef98834afdf04e57bfedb1906834e2b))
* update dependencies to renamed @qui-cli/core ([f834c5a](https://github.com/battis/qui-cli/commit/f834c5a475f908585f1e17865917a092516168a0))
* update dependencies to renamed @qui-cli/log ([1c8f0fb](https://github.com/battis/qui-cli/commit/1c8f0fbd5561b4274032382c5d10d33912956e7f))
* update dependencies to renamed @qui-cli/plugin ([117ea85](https://github.com/battis/qui-cli/commit/117ea85256ec69c807c5b56293546d9c350fd43f))

## [2.1.2](https://github.com/battis/qui-cli/compare/shell/2.1.1...shell/2.1.2) (2025-06-23)

### Bug Fixes

- update peer dependency versions to minimum viable ([a776908](https://github.com/battis/qui-cli/commit/a7769085adef6da665da7a67cb143af1e0bba6be))

## [2.1.1](https://github.com/battis/qui-cli/compare/shell/2.1.0...shell/2.1.1) (2025-06-23)

## [2.1.0](https://github.com/battis/qui-cli/compare/shell/2.0.3...shell/2.1.0) (2025-06-21)

### Features

- consistently allow no parameters to configure() ([bd4ba86](https://github.com/battis/qui-cli/commit/bd4ba8697691020b8368482f66f1124cd91926fd))

## [2.0.3](https://github.com/battis/qui-cli/compare/shell/2.0.2...shell/2.0.3) (2025-06-18)

### Bug Fixes

- clean up typing of arguments ([64d8807](https://github.com/battis/qui-cli/commit/64d88075bdd5653f8ab84ab4e3f2805ab62748a2))

## [2.0.2](https://github.com/battis/qui-cli/compare/shell/2.0.1...shell/2.0.2) (2025-03-07)

### Features

- **log:** Log.syntaxColor() to ANSI color an object for output ([211f091](https://github.com/battis/qui-cli/commit/211f091c00c945a4d99cf5216b6c06bad978dc30))

## [2.0.1](https://github.com/battis/qui-cli/compare/shell/2.0.0...shell/2.0.1) (2025-02-23)

### Bug Fixes

- more flexible peer dependency ([7f47c91](https://github.com/battis/qui-cli/commit/7f47c91646413b3760d7bf32821f078cc33012e6))

## [2.0.0](https://github.com/battis/qui-cli/compare/shell/1.0.0...shell/2.0.0) (2025-02-23)

### ⚠ BREAKING CHANGES

- **plugin:** async hooks

## [1.0.0](https://github.com/battis/qui-cli/compare/shell/0.8.3...shell/1.0.0) (2025-02-21)

### ⚠ BREAKING CHANGES

- reimplement as ESM module

### Features

- reimplement as ESM module ([953a7b8](https://github.com/battis/qui-cli/commit/953a7b820e19832639d07fd31553e546a9bdc0d6))

### Bug Fixes

- configuration compliant with Plugin.Configuration ([968effb](https://github.com/battis/qui-cli/commit/968effbb4828d5f285995fbdf9c1e01f6a3ce874))

## 0.8.3

### Patch Changes

- 75a0c50: fix reverse compatibility with shelljs mapping

## 0.8.2

### Patch Changes

- 6badb2b: fix(?) incompatibility with v0.7.x scripts
- Updated dependencies [6badb2b]
  - @qui-cli/log@0.8.2
  - @qui-cli/plugin@0.1.2
  - @qui-cli/colors@0.8.2

## 0.8.1

### Patch Changes

- a259210: fix init (with janky literals)
- Updated dependencies [a259210]
  - @qui-cli/log@0.8.1
  - @qui-cli/plugin@0.1.1
  - @qui-cli/colors@0.8.1

## 0.8.0

### Minor Changes

- 97d48ef: refactored for plugin architecture

### Patch Changes

- Updated dependencies [97d48ef]
  - @qui-cli/colors@0.8.0
  - @qui-cli/log@0.8.0
  - @qui-cli/plugin@0.1.0
