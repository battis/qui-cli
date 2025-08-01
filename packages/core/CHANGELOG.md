# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [3.1.0](https://github.com/battis/qui-cli/compare/core/3.0.0...core/3.1.0) (2025-08-01)


### Features

* present usage information in order defined in options() hook ([f470d07](https://github.com/battis/qui-cli/commit/f470d07ed27a9c774d5622641a385e62e37bde80))

## [3.0.0](https://github.com/battis/qui-cli/compare/core/2.2.1...core/3.0.0) (2025-06-28)


### ⚠ BREAKING CHANGES

* add positional documentation to -h usage documentation
* color-code command terms in -h usage output
* reorder Help before JackSpeak to ensure -h flag operability

### Features

* add positional documentation to -h usage documentation ([667986b](https://github.com/battis/qui-cli/commit/667986b7036cabc3f45341b9b61283d142a2cb0a))
* color-code command terms in -h usage output ([01fd5a2](https://github.com/battis/qui-cli/commit/01fd5a2c6a08436a558f85343b7eec47556d1727))
* core plugins Positionals and JackSpeak ([c358fc4](https://github.com/battis/qui-cli/commit/c358fc437c1021a15a09b6c0be2fa8dfb9c9308a))


### Bug Fixes

* reorder Help before JackSpeak to ensure -h flag operability ([594f7ac](https://github.com/battis/qui-cli/commit/594f7ac93513bb55d714149f261a6e76c397931e))

## [2.2.1](https://github.com/battis/qui-cli/compare/core/2.2.0...core/2.2.1) (2025-06-23)


### Bug Fixes

* update peer dependency versions to minimum viable ([a776908](https://github.com/battis/qui-cli/commit/a7769085adef6da665da7a67cb143af1e0bba6be))

## [2.2.0](https://github.com/battis/qui-cli/compare/core/2.1.1...core/2.2.0) (2025-06-23)


### Features

* options loaded by plugin import order ([778ee41](https://github.com/battis/qui-cli/commit/778ee41442e190d1d20fdc31217bba13e82ef6a3))
* src property no longer required for plugins ([5ccd2ab](https://github.com/battis/qui-cli/commit/5ccd2ab67b618ec7121dacacc9fbf059f163f3b8))

## [2.1.1](https://github.com/battis/qui-cli/compare/core/2.1.0...core/2.1.1) (2025-06-18)

### Bug Fixes

- clean up typing of arguments ([64d8807](https://github.com/battis/qui-cli/commit/64d88075bdd5653f8ab84ab4e3f2805ab62748a2))

## [2.1.0](https://github.com/battis/qui-cli/compare/core/2.0.1...core/2.1.0) (2025-02-28)

### Features

- **qui-cli.core:** run() ([a2c5ba2](https://github.com/battis/qui-cli/commit/a2c5ba2f8de6c52a88c1cf75ac37f93b51fb8211))

### Bug Fixes

- **qui-cli.core:** catch repeated initializations ([6caee60](https://github.com/battis/qui-cli/commit/6caee60234874eaaafc6e4046cfa699a709c9421))

## [2.0.1](https://github.com/battis/qui-cli/compare/core/2.0.0...core/2.0.1) (2025-02-23)

### Bug Fixes

- **qui-cli.core:** more flexible peer dependency ([f03e1be](https://github.com/battis/qui-cli/commit/f03e1bef07af225fbebddc12b65d2a7bd3c81c0e))

## [2.0.0](https://github.com/battis/qui-cli/compare/core/1.0.0...core/2.0.0) (2025-02-23)

### ⚠ BREAKING CHANGES

- **qui-cli.core:** nest core config under core key
- **qui-cli.core:** async hooks

### Features

- **qui-cli.core:** async hooks ([75966de](https://github.com/battis/qui-cli/commit/75966de51050b7db91027d79072060607965139c))

### Bug Fixes

- **qui-cli.core:** nest core config under core key ([e4828f9](https://github.com/battis/qui-cli/commit/e4828f989cb5dfec45da2eafe62f57303803debe))

## [1.0.0](https://github.com/battis/qui-cli/compare/core/0.8.4...core/1.0.0) (2025-02-21)

### ⚠ BREAKING CHANGES

- **qui-cli.core:** ESM module implementation

### Features

- **qui-cli.core:** ESM module implementation ([7a14472](https://github.com/battis/qui-cli/commit/7a14472ec83aa6186beb4b7b8632cfd2df2c6d49))

### Bug Fixes

- **qui-cli,qui-cli.core:** auto-configure on init ([37bb1c3](https://github.com/battis/qui-cli/commit/37bb1c3b49e6ee9e698d42f1e8d20da380f14636))
- **qui-cli.core:** simplify tortured Core.configure() logic ([c7f0335](https://github.com/battis/qui-cli/commit/c7f03359bb4d12858775baa91a5bc4189fe86736))

## 0.8.4

### Patch Changes

- ad6edd4: check for help flag _first_

## 0.8.3

### Patch Changes

- 6badb2b: fix(?) incompatibility with v0.7.x scripts
- Updated dependencies [6badb2b]
  - @battis/qui-cli.plugin@0.1.2

## 0.8.2

### Patch Changes

- Updated dependencies [a259210]
  - @battis/qui-cli.plugin@0.1.1

## 0.8.1

### Patch Changes

- ab8ce9f: fix args

## 0.8.0

### Minor Changes

- 97d48ef: refactored for plugin architecture

### Patch Changes

- Updated dependencies [97d48ef]
  - @battis/qui-cli.plugin@0.1.0
