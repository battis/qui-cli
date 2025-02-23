# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [2.0.1](https://github.com/battis/qui-cli/compare/log/2.0.0...log/2.0.1) (2025-02-23)


### Bug Fixes

* **qui-cli.log:** more flexible peer dependency ([718af89](https://github.com/battis/qui-cli/commit/718af8971cd33cbdc5f0935111eb53d63b894c63))

## [2.0.0](https://github.com/battis/qui-cli/compare/log/1.0.0...log/2.0.0) (2025-02-23)

### ⚠ BREAKING CHANGES

- **qui-cli.plugin:** async hooks

## [1.0.0](https://github.com/battis/qui-cli/compare/log/0.8.4...log/1.0.0) (2025-02-21)

### ⚠ BREAKING CHANGES

- **qui-cli.log:** reimplement as ESM module

### Features

- **qui-cli.log:** configurable log levels ([32a8a2a](https://github.com/battis/qui-cli/commit/32a8a2a20b171d633d0349eff991a78da175e2c0))
- **qui-cli.log:** export CustomLevels type and DefaultLevels ([efbbe72](https://github.com/battis/qui-cli/commit/efbbe72826d8146adc9a4d669c38156f10f8499e))
- **qui-cli.log:** reimplement as ESM module ([48dfcbe](https://github.com/battis/qui-cli/commit/48dfcbeb91dd8df1d5df418589df1307d931f1a4))

### Bug Fixes

- **qui-cli.log:** clean up typing for stripColors() ([c6ba951](https://github.com/battis/qui-cli/commit/c6ba9513b3fff5365e70e9b32499f4e2ba0ccb5c))
- **qui-cli.log:** compliance with Plugin.Configuration ([5965236](https://github.com/battis/qui-cli/commit/596523626af9dfbaa244fc978b2f39d1a599d2b8))
- **qui-cli.log:** reconfigurable logger ([a8162a9](https://github.com/battis/qui-cli/commit/a8162a9207ef45881380c3c386aaee44acb148c8)), closes [#19](https://github.com/battis/qui-cli/issues/19)
- **qui-cli.log:** simplify log configuration logic ([399872e](https://github.com/battis/qui-cli/commit/399872e18f1285b657f01c661a37dfc177fa9f5c))

## [0.8.4](https://github.com/battis/qui-cli/compare/log/0.8.3...log/0.8.4) (2025-02-09)

### Bug Fixes

- **qui-cli.log:** reset options when getting instance with options ([ac73793](https://github.com/battis/qui-cli/commit/ac737933ce2551f8167c2d3fbf2a76c7d7a8fb90))

## [0.8.3](https://github.com/battis/qui-cli/compare/log/0.8.2...log/0.8.3) (2025-02-09)

### Features

- **qui-cli.log:** allow appRoot() override, but fall back to appRoot() ([63af9bb](https://github.com/battis/qui-cli/commit/63af9bb89cda56a089e8ef75a6cf3a97ce382428))

## 0.8.2

### Patch Changes

- 6badb2b: fix(?) incompatibility with v0.7.x scripts
- Updated dependencies [6badb2b]
  - @battis/qui-cli.plugin@0.1.2
  - @battis/qui-cli.colors@0.8.2

## 0.8.1

### Patch Changes

- a259210: fix init (with janky literals)
- Updated dependencies [a259210]
  - @battis/qui-cli.plugin@0.1.1
  - @battis/qui-cli.colors@0.8.1

## 0.8.0

### Minor Changes

- 97d48ef: refactored for plugin architecture

### Patch Changes

- Updated dependencies [97d48ef]
  - @battis/qui-cli.colors@0.8.0
  - @battis/qui-cli.plugin@0.1.0
