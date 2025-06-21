# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [2.1.0](https://github.com/battis/qui-cli/compare/env/2.0.6...env/2.1.0) (2025-06-21)


### Features

* consistently allow no parameters to configure() ([bd4ba86](https://github.com/battis/qui-cli/commit/bd4ba8697691020b8368482f66f1124cd91926fd))

## [2.0.6](https://github.com/battis/qui-cli/compare/env/2.0.5...env/2.0.6) (2025-06-21)


### Bug Fixes

* better document environment variable loading sequence ([64aa906](https://github.com/battis/qui-cli/commit/64aa906667bb43fd6c43e6c284bf306150fc8f7e)), closes [#55](https://github.com/battis/qui-cli/issues/55)

## [2.0.5](https://github.com/battis/qui-cli/compare/env/2.0.4...env/2.0.5) (2025-06-18)

## [2.0.4](https://github.com/battis/qui-cli/compare/env/2.0.3...env/2.0.4) (2025-03-21)


### Bug Fixes

* **env:** add @battis/qui-cli.root to plugin chain ([23b0af8](https://github.com/battis/qui-cli/commit/23b0af8701317fe4b86cd49a0fe62258e51ffbe6))

## [2.0.3](https://github.com/battis/qui-cli/compare/env/2.0.2...env/2.0.3) (2025-02-27)


### Bug Fixes

* **qui-cli.env:** allow creation of new .env file if not present ([c7fd3e3](https://github.com/battis/qui-cli/commit/c7fd3e35653efd1157c8ebc0e72da370561f0a92))

## [2.0.2](https://github.com/battis/qui-cli/compare/env/2.0.1...env/2.0.2) (2025-02-24)


### Bug Fixes

* **qui-cli.env:** ignore non-existent .env file ([7514598](https://github.com/battis/qui-cli/commit/75145984ee5cc5c081c33f9c6d44244cc2140681))

## [2.0.1](https://github.com/battis/qui-cli/compare/env/2.0.0...env/2.0.1) (2025-02-23)


### Bug Fixes

* **qui-cli.env:** more flexible peer dependency ([0f971e5](https://github.com/battis/qui-cli/commit/0f971e5d29b07a31020ee847c22461310eb1bbe6))

## [2.0.0](https://github.com/battis/qui-cli/compare/env/1.0.0...env/2.0.0) (2025-02-23)

### ⚠ BREAKING CHANGES

- **qui-cli.plugin:** async hooks

## [1.0.0](https://github.com/battis/qui-cli/compare/env/0.8.6...env/1.0.0) (2025-02-21)

### ⚠ BREAKING CHANGES

- **qui-cli.env,qui-cli.root:** move cwd config to root
- **qui-cli.env:** .env loading logic fixed
- **qui-cli.env:** reimplement as ESM module

- **qui-cli.env,qui-cli.root:** move cwd config to root ([1b34863](https://github.com/battis/qui-cli/commit/1b3486338fb1c12576c136e2b4e8654f04bfcbeb))

### Features

- **qui-cli.env:** reimplement as ESM module ([913b625](https://github.com/battis/qui-cli/commit/913b62515fd15fd460307e1df64128800d74d896))

### Bug Fixes

- **qui-cli.env:** .env loading logic fixed ([82a80d3](https://github.com/battis/qui-cli/commit/82a80d39e94a7fab165a3d3c9492d4ecf77f1bdb))

## [0.8.6](https://github.com/battis/qui-cli/compare/env/0.8.5...env/0.8.6) (2025-02-09)

### Bug Fixes

- **qui-cli.env:** parse explicitly if loadDotEnv is truthy ([0719408](https://github.com/battis/qui-cli/commit/0719408551f55133b04c55d287998d126e8f07c7))

## [0.8.5](https://github.com/battis/qui-cli/compare/env/0.8.4...env/0.8.5) (2025-02-09)

### Features

- **qui-cli.env:** allow appRoot() override, but fall back to appRoot() ([b6bdb15](https://github.com/battis/qui-cli/commit/b6bdb158d44cdd81beee441bf78b95602966e1d0))

### Bug Fixes

- **qui-cli.env:** parse .env during init ([2de3167](https://github.com/battis/qui-cli/commit/2de3167be47c51f9dd44aaa126a4c375631b1852))

## [0.8.4](https://github.com/battis/qui-cli/compare/env/0.8.3...env/0.8.4) (2025-02-09)

### Bug Fixes

- **env:** do not mistakenly cache old appRoot ([ecbad81](https://github.com/battis/qui-cli/commit/ecbad812d30b571d5b8291317bd075ba8d565416))

## [0.8.3](https://github.com/battis/qui-cli/compare/env/0.8.2...env/0.8.3) (2025-02-09)

## 0.8.2

### Patch Changes

- 6badb2b: fix(?) incompatibility with v0.7.x scripts
- Updated dependencies [6badb2b]
  - @battis/qui-cli.plugin@0.1.2
  - @battis/qui-cli.root@0.8.2

## 0.8.1

### Patch Changes

- Updated dependencies [a259210]
  - @battis/qui-cli.plugin@0.1.1
  - @battis/qui-cli.root@0.8.1

## 0.8.0

### Minor Changes

- 97d48ef: refactored for plugin architecture

### Patch Changes

- Updated dependencies [97d48ef]
  - @battis/qui-cli.plugin@0.1.0
  - @battis/qui-cli.root@0.8.0
