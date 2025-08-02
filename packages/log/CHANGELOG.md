# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [3.0.0](https://github.com/battis/qui-cli/compare/log/2.2.2...log/3.0.0) (2025-08-02)


### ⚠ BREAKING CHANGES

* rename @battis/qui-cli.log --> @qui-cli/log

* rename @battis/qui-cli.log --> @qui-cli/log ([ba2ef7b](https://github.com/battis/qui-cli/commit/ba2ef7b08e9289d326d18cd6a8a3be1f8f81b8ce))


### Bug Fixes

* update dependencies to renamed @qui-cli/colors ([ff80e86](https://github.com/battis/qui-cli/commit/ff80e8625ef98834afdf04e57bfedb1906834e2b))
* update dependencies to renamed @qui-cli/core ([f834c5a](https://github.com/battis/qui-cli/commit/f834c5a475f908585f1e17865917a092516168a0))
* update dependencies to renamed @qui-cli/env ([5ff9ee8](https://github.com/battis/qui-cli/commit/5ff9ee844222dc4c73fd8cbdbfeaaa16541a158b))
* update dependencies to renamed @qui-cli/plugin ([117ea85](https://github.com/battis/qui-cli/commit/117ea85256ec69c807c5b56293546d9c350fd43f))
* update dependencies to renamed @qui-cli/root ([488daa7](https://github.com/battis/qui-cli/commit/488daa7a82730125481945b5eb8db960972ac225))

## [2.2.2](https://github.com/battis/qui-cli/compare/log/2.2.1...log/2.2.2) (2025-06-23)

### Bug Fixes

- update peer dependency versions to minimum viable ([a776908](https://github.com/battis/qui-cli/commit/a7769085adef6da665da7a67cb143af1e0bba6be))

## [2.2.1](https://github.com/battis/qui-cli/compare/log/2.2.0...log/2.2.1) (2025-06-23)

## [2.2.0](https://github.com/battis/qui-cli/compare/log/2.1.1...log/2.2.0) (2025-06-21)

### Features

- consistently allow no parameters to configure() ([bd4ba86](https://github.com/battis/qui-cli/commit/bd4ba8697691020b8368482f66f1124cd91926fd))

## [2.1.1](https://github.com/battis/qui-cli/compare/log/2.1.0...log/2.1.1) (2025-06-18)

### Bug Fixes

- clean up typing of arguments ([64d8807](https://github.com/battis/qui-cli/commit/64d88075bdd5653f8ab84ab4e3f2805ab62748a2))

## [2.1.0](https://github.com/battis/qui-cli/compare/log/2.0.1...log/2.1.0) (2025-03-07)

### Features

- Log.syntaxColor() to ANSI color an object for output ([211f091](https://github.com/battis/qui-cli/commit/211f091c00c945a4d99cf5216b6c06bad978dc30))

## [2.0.1](https://github.com/battis/qui-cli/compare/log/2.0.0...log/2.0.1) (2025-02-23)

### Bug Fixes

- more flexible peer dependency ([718af89](https://github.com/battis/qui-cli/commit/718af8971cd33cbdc5f0935111eb53d63b894c63))

## [2.0.0](https://github.com/battis/qui-cli/compare/log/1.0.0...log/2.0.0) (2025-02-23)

### ⚠ BREAKING CHANGES

- **plugin:** async hooks

## [1.0.0](https://github.com/battis/qui-cli/compare/log/0.8.4...log/1.0.0) (2025-02-21)

### ⚠ BREAKING CHANGES

- reimplement as ESM module

### Features

- configurable log levels ([32a8a2a](https://github.com/battis/qui-cli/commit/32a8a2a20b171d633d0349eff991a78da175e2c0))
- export CustomLevels type and DefaultLevels ([efbbe72](https://github.com/battis/qui-cli/commit/efbbe72826d8146adc9a4d669c38156f10f8499e))
- reimplement as ESM module ([48dfcbe](https://github.com/battis/qui-cli/commit/48dfcbeb91dd8df1d5df418589df1307d931f1a4))

### Bug Fixes

- clean up typing for stripColors() ([c6ba951](https://github.com/battis/qui-cli/commit/c6ba9513b3fff5365e70e9b32499f4e2ba0ccb5c))
- compliance with Plugin.Configuration ([5965236](https://github.com/battis/qui-cli/commit/596523626af9dfbaa244fc978b2f39d1a599d2b8))
- reconfigurable logger ([a8162a9](https://github.com/battis/qui-cli/commit/a8162a9207ef45881380c3c386aaee44acb148c8)), closes [#19](https://github.com/battis/qui-cli/issues/19)
- simplify log configuration logic ([399872e](https://github.com/battis/qui-cli/commit/399872e18f1285b657f01c661a37dfc177fa9f5c))

## [0.8.4](https://github.com/battis/qui-cli/compare/log/0.8.3...log/0.8.4) (2025-02-09)

### Bug Fixes

- reset options when getting instance with options ([ac73793](https://github.com/battis/qui-cli/commit/ac737933ce2551f8167c2d3fbf2a76c7d7a8fb90))

## [0.8.3](https://github.com/battis/qui-cli/compare/log/0.8.2...log/0.8.3) (2025-02-09)

### Features

- allow appRoot() override, but fall back to appRoot() ([63af9bb](https://github.com/battis/qui-cli/commit/63af9bb89cda56a089e8ef75a6cf3a97ce382428))

## 0.8.2

### Patch Changes

- 6badb2b: fix(?) incompatibility with v0.7.x scripts
- Updated dependencies [6badb2b]
  - @qui-cli/plugin@0.1.2
  - @qui-cli/colors@0.8.2

## 0.8.1

### Patch Changes

- a259210: fix init (with janky literals)
- Updated dependencies [a259210]
  - @qui-cli/plugin@0.1.1
  - @qui-cli/colors@0.8.1

## 0.8.0

### Minor Changes

- 97d48ef: refactored for plugin architecture

### Patch Changes

- Updated dependencies [97d48ef]
  - @qui-cli/colors@0.8.0
  - @qui-cli/plugin@0.1.0
