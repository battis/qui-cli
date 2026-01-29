# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [6.0.0](https://github.com/battis/qui-cli/compare/core/5.0.3...core/6.0.0) (2026-01-29)


### ⚠ BREAKING CHANGES

* allow errors to be thrown

### Bug Fixes

* allow errors to be thrown ([8bf98db](https://github.com/battis/qui-cli/commit/8bf98db45ebe06514cef02572d515379985c7067))
* preempt all other plugins if --help is set ([db99833](https://github.com/battis/qui-cli/commit/db9983336135080a5fecff6adbf2e2913f55fa8d))

## [5.0.3](https://github.com/battis/qui-cli/compare/core/5.0.2...core/5.0.3) (2026-01-18)


### Bug Fixes

* compile against Node.js v24 ([7b06b4f](https://github.com/battis/qui-cli/commit/7b06b4f4ac4f9688719041ab8b1d837b3a0ee214))

## [5.0.2](https://github.com/battis/qui-cli/compare/core/5.0.1...core/5.0.2) (2026-01-02)


### Bug Fixes

* normalize peer dependencies ([cdd81b7](https://github.com/battis/qui-cli/commit/cdd81b7c4bea7c769021ff58177750c5a1369f76))
* update color-coding to current standards ([2fccf74](https://github.com/battis/qui-cli/commit/2fccf7433f729020022b7df85578e05576b47958))

## [5.0.1](https://github.com/battis/qui-cli/compare/core/5.0.0...core/5.0.1) (2025-12-19)


### Bug Fixes

* update documentation to reflect current core plugin model ([dbb3f26](https://github.com/battis/qui-cli/commit/dbb3f269d3dc3996c1d7050eb3a1acfdd08ab640))

## [5.0.0](https://github.com/battis/qui-cli/compare/core/4.1.0...core/5.0.0) (2025-11-07)

### ⚠ BREAKING CHANGES

- group arguments by plugin in usage
- **plugin@4.0.0** auto-document default arg values

### revert

- group arguments by plugin in usage ([ec3d4bf](https://github.com/battis/qui-cli/commit/ec3d4bf6ef9c59a6da3ede8603554d2dcd2581ad))
- **plugin@4.0.0** auto-document default arg values ([e01e157](https://github.com/battis/qui-cli/commit/e01e157f06a3a801628ca79366e3f0060be2322e))

### Bug Fixes

- merge plugin option in Plugin.Registrar, not in Core ([9a7464f](https://github.com/battis/qui-cli/commit/9a7464fab863c7a9005ade54703726cc9679c8c4))

## [4.1.0](https://github.com/battis/qui-cli/compare/core/4.0.1...core/4.1.0) (2025-11-04)

### Features

- support scripting markdown documentation for commands ([03ee6d5](https://github.com/battis/qui-cli/commit/03ee6d55f86f6d7b45bd205896cb0fb6a21523b5))

## [4.0.1](https://github.com/battis/qui-cli/compare/core/4.0.0...core/4.0.1) (2025-08-04)

### Bug Fixes

- update lagging peer dependency specs ([30c0c27](https://github.com/battis/qui-cli/commit/30c0c279d4247a69a30efef8a7426442752cd9c0))

## [4.0.0](https://github.com/battis/qui-cli/compare/core/3.1.0...core/4.0.0) (2025-08-02)

### ⚠ BREAKING CHANGES

- rename @battis/qui-cli.core --> @qui-cli/core

- rename @battis/qui-cli.core --> @qui-cli/core ([43367e9](https://github.com/battis/qui-cli/commit/43367e9d4316aa22fb28078e9436e6de35564f1f))

### Bug Fixes

- update dependencies to renamed @qui-cli/colors ([ff80e86](https://github.com/battis/qui-cli/commit/ff80e8625ef98834afdf04e57bfedb1906834e2b))
- update dependencies to renamed @qui-cli/log ([1c8f0fb](https://github.com/battis/qui-cli/commit/1c8f0fbd5561b4274032382c5d10d33912956e7f))
- update dependencies to renamed @qui-cli/plugin ([117ea85](https://github.com/battis/qui-cli/commit/117ea85256ec69c807c5b56293546d9c350fd43f))

## [3.1.0](https://github.com/battis/qui-cli/compare/core/3.0.0...core/3.1.0) (2025-08-01)

### Features

- present usage information in order defined in options() hook ([f470d07](https://github.com/battis/qui-cli/commit/f470d07ed27a9c774d5622641a385e62e37bde80))

## [3.0.0](https://github.com/battis/qui-cli/compare/core/2.2.1...core/3.0.0) (2025-06-28)

### ⚠ BREAKING CHANGES

- add positional documentation to -h usage documentation
- color-code command terms in -h usage output
- reorder Help before JackSpeak to ensure -h flag operability

### Features

- add positional documentation to -h usage documentation ([667986b](https://github.com/battis/qui-cli/commit/667986b7036cabc3f45341b9b61283d142a2cb0a))
- color-code command terms in -h usage output ([01fd5a2](https://github.com/battis/qui-cli/commit/01fd5a2c6a08436a558f85343b7eec47556d1727))
- core plugins Positionals and JackSpeak ([c358fc4](https://github.com/battis/qui-cli/commit/c358fc437c1021a15a09b6c0be2fa8dfb9c9308a))

### Bug Fixes

- reorder Help before JackSpeak to ensure -h flag operability ([594f7ac](https://github.com/battis/qui-cli/commit/594f7ac93513bb55d714149f261a6e76c397931e))

## [2.2.1](https://github.com/battis/qui-cli/compare/core/2.2.0...core/2.2.1) (2025-06-23)

### Bug Fixes

- update peer dependency versions to minimum viable ([a776908](https://github.com/battis/qui-cli/commit/a7769085adef6da665da7a67cb143af1e0bba6be))

## [2.2.0](https://github.com/battis/qui-cli/compare/core/2.1.1...core/2.2.0) (2025-06-23)

### Features

- options loaded by plugin import order ([778ee41](https://github.com/battis/qui-cli/commit/778ee41442e190d1d20fdc31217bba13e82ef6a3))
- src property no longer required for plugins ([5ccd2ab](https://github.com/battis/qui-cli/commit/5ccd2ab67b618ec7121dacacc9fbf059f163f3b8))

## [2.1.1](https://github.com/battis/qui-cli/compare/core/2.1.0...core/2.1.1) (2025-06-18)

### Bug Fixes

- clean up typing of arguments ([64d8807](https://github.com/battis/qui-cli/commit/64d88075bdd5653f8ab84ab4e3f2805ab62748a2))

## [2.1.0](https://github.com/battis/qui-cli/compare/core/2.0.1...core/2.1.0) (2025-02-28)

### Features

- run() ([a2c5ba2](https://github.com/battis/qui-cli/commit/a2c5ba2f8de6c52a88c1cf75ac37f93b51fb8211))

### Bug Fixes

- catch repeated initializations ([6caee60](https://github.com/battis/qui-cli/commit/6caee60234874eaaafc6e4046cfa699a709c9421))

## [2.0.1](https://github.com/battis/qui-cli/compare/core/2.0.0...core/2.0.1) (2025-02-23)

### Bug Fixes

- more flexible peer dependency ([f03e1be](https://github.com/battis/qui-cli/commit/f03e1bef07af225fbebddc12b65d2a7bd3c81c0e))

## [2.0.0](https://github.com/battis/qui-cli/compare/core/1.0.0...core/2.0.0) (2025-02-23)

### ⚠ BREAKING CHANGES

- nest core config under core key
- async hooks

### Features

- async hooks ([75966de](https://github.com/battis/qui-cli/commit/75966de51050b7db91027d79072060607965139c))

### Bug Fixes

- nest core config under core key ([e4828f9](https://github.com/battis/qui-cli/commit/e4828f989cb5dfec45da2eafe62f57303803debe))

## [1.0.0](https://github.com/battis/qui-cli/compare/core/0.8.4...core/1.0.0) (2025-02-21)

### ⚠ BREAKING CHANGES

- ESM module implementation

### Features

- ESM module implementation ([7a14472](https://github.com/battis/qui-cli/commit/7a14472ec83aa6186beb4b7b8632cfd2df2c6d49))

### Bug Fixes

- auto-configure on init ([37bb1c3](https://github.com/battis/qui-cli/commit/37bb1c3b49e6ee9e698d42f1e8d20da380f14636))
- simplify tortured Core.configure() logic ([c7f0335](https://github.com/battis/qui-cli/commit/c7f03359bb4d12858775baa91a5bc4189fe86736))

## 0.8.4

### Patch Changes

- ad6edd4: check for help flag _first_

## 0.8.3

### Patch Changes

- 6badb2b: fix(?) incompatibility with v0.7.x scripts
- Updated dependencies [6badb2b]
  - @qui-cli/plugin@0.1.2

## 0.8.2

### Patch Changes

- Updated dependencies [a259210]
  - @qui-cli/plugin@0.1.1

## 0.8.1

### Patch Changes

- ab8ce9f: fix args

## 0.8.0

### Minor Changes

- 97d48ef: refactored for plugin architecture

### Patch Changes

- Updated dependencies [97d48ef]
  - @qui-cli/plugin@0.1.0
