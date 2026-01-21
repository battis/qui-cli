# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [5.1.1](https://github.com/battis/qui-cli/compare/env/5.1.0...env/5.1.1) (2026-01-21)


### Bug Fixes

* configure 1Password before looking up secret references ([7046af5](https://github.com/battis/qui-cli/commit/7046af55ed2720b7b74bd437f335fe49fa8bc00f))

## [5.1.0](https://github.com/battis/qui-cli/compare/env/5.0.4...env/5.1.0) (2026-01-19)


### Features

* support 1Password secret references if @1password/sdk (and 1Password) installed ([ed4570c](https://github.com/battis/qui-cli/commit/ed4570cd5cf19ae34fc03f6b88b01f0ebf72e72d))


### Bug Fixes

* detect missing 1Password CLI ([3c306ba](https://github.com/battis/qui-cli/commit/3c306ba7e37394948666f96b1ad728e8abc65a4e)), closes [#81](https://github.com/battis/qui-cli/issues/81)

## [5.0.4](https://github.com/battis/qui-cli/compare/env/5.0.3...env/5.0.4) (2026-01-18)


### Bug Fixes

* compile against Node.js v24 ([7b06b4f](https://github.com/battis/qui-cli/commit/7b06b4f4ac4f9688719041ab8b1d837b3a0ee214))

## [5.0.3](https://github.com/battis/qui-cli/compare/env/5.0.2...env/5.0.3) (2026-01-02)


### Bug Fixes

* normalize peer dependencies ([cdd81b7](https://github.com/battis/qui-cli/commit/cdd81b7c4bea7c769021ff58177750c5a1369f76))

## [5.0.2](https://github.com/battis/qui-cli/compare/env/5.0.1...env/5.0.2) (2025-12-19)


### Bug Fixes

* increase accuracy of README ([94e2c4c](https://github.com/battis/qui-cli/commit/94e2c4c2f8d146715d19c7f36b6f8f1d0d8980f8))

## [5.0.1](https://github.com/battis/qui-cli/compare/env/5.0.0...env/5.0.1) (2025-11-08)

## [5.0.0](https://github.com/battis/qui-cli/compare/env/4.1.0...env/5.0.0) (2025-11-07)

### ⚠ BREAKING CHANGES

- expose env-1password as a separate plugin
- separate 1Password without requiring knowledge of module structure
- no longer accepting 1Password service account token as environment variable
- **plugin@4.0.0** auto-document default arg values

### Features

- expose env-1password as a separate plugin ([90ecb79](https://github.com/battis/qui-cli/commit/90ecb7900b85ade45113fc5a5999f2a2ff87f580))
- **plugin@4.0.0** auto-document default arg values ([e01e157](https://github.com/battis/qui-cli/commit/e01e157f06a3a801628ca79366e3f0060be2322e))

### Bug Fixes

- no longer accepting 1Password service account token as environment variable ([db7ae6a](https://github.com/battis/qui-cli/commit/db7ae6ac615c51a9966f201c85a8388bf4ebd76a))
- separate 1Password without requiring knowledge of module structure ([c21fe44](https://github.com/battis/qui-cli/commit/c21fe44d7d72d5d6bc4d092cb869164117378ab2))

## [4.1.0](https://github.com/battis/qui-cli/compare/env/4.0.1...env/4.1.0) (2025-11-04)

### Features

- standardize on modules labeling the options that they add to the usage man page ([eba86cd](https://github.com/battis/qui-cli/commit/eba86cd8a22a93aa6b6f19a3979272d87fe59274))

## [4.0.1](https://github.com/battis/qui-cli/compare/env/4.0.0...env/4.0.1) (2025-08-04)

### Bug Fixes

- update lagging peer dependency specs ([30c0c27](https://github.com/battis/qui-cli/commit/30c0c279d4247a69a30efef8a7426442752cd9c0))

## [4.0.0](https://github.com/battis/qui-cli/compare/env/3.1.2...env/4.0.0) (2025-08-02)

### ⚠ BREAKING CHANGES

- rename @battis/qui-cli.env --> @qui-cli/env

- rename @battis/qui-cli.env --> @qui-cli/env ([0a90e32](https://github.com/battis/qui-cli/commit/0a90e32d401c46f7d26f7220ca3369a587d86ec6))

### Bug Fixes

- update dependencies to renamed @qui-cli/colors ([ff80e86](https://github.com/battis/qui-cli/commit/ff80e8625ef98834afdf04e57bfedb1906834e2b))
- update dependencies to renamed @qui-cli/plugin ([117ea85](https://github.com/battis/qui-cli/commit/117ea85256ec69c807c5b56293546d9c350fd43f))
- update dependencies to renamed @qui-cli/root ([488daa7](https://github.com/battis/qui-cli/commit/488daa7a82730125481945b5eb8db960972ac225))

## [3.1.2](https://github.com/battis/qui-cli/compare/env/3.1.1...env/3.1.2) (2025-07-31)

### Bug Fixes

- parse (and optionally load) .env file in init() lifecycle hook ([404a081](https://github.com/battis/qui-cli/commit/404a0817170f35d49e187013d237e93bdaa3f37b))
- restructure OP to properly extend Env rather than depend on it ([3661843](https://github.com/battis/qui-cli/commit/36618439d541d31388ef70ee776647ad7562c0ef))

## [3.1.1](https://github.com/battis/qui-cli/compare/env/3.1.0...env/3.1.1) (2025-07-16)

### Bug Fixes

- 1Password is dependency, not peer ([26ef8a5](https://github.com/battis/qui-cli/commit/26ef8a589d87da4dfa90f74c898b09fb77b2e7ed))

## [3.1.0](https://github.com/battis/qui-cli/compare/env/3.0.1...env/3.1.0) (2025-07-15)

### Features

- remove 1Password from Env, set up as separate plugin ([c2939d6](https://github.com/battis/qui-cli/commit/c2939d69badbd8aef2678c70997aee317fc365d9))

## [3.0.1](https://github.com/battis/qui-cli/compare/env/3.0.0...env/3.0.1) (2025-07-09)

### Bug Fixes

- throw no errors if @1password/sdk is not present ([9176a45](https://github.com/battis/qui-cli/commit/9176a45e32b5ba225eef4d19a21bc5115ad7cadf))

## [3.0.0](https://github.com/battis/qui-cli/compare/env/2.1.2...env/3.0.0) (2025-07-09)

### ⚠ BREAKING CHANGES

- optional support for 1Password secret references in .env

### Features

- optional support for 1Password secret references in .env ([169fa3a](https://github.com/battis/qui-cli/commit/169fa3adbdafd3180ea3a9894a3695e6b0c846e4)), closes [/github.com/battis/qui-cli/tree/main/packages/env#1](https://github.com/battis//github.com/battis/qui-cli/tree/main/packages/env/issues/1)

## [2.1.2](https://github.com/battis/qui-cli/compare/env/2.1.1...env/2.1.2) (2025-06-23)

### Bug Fixes

- update peer dependency versions to minimum viable ([a776908](https://github.com/battis/qui-cli/commit/a7769085adef6da665da7a67cb143af1e0bba6be))

## [2.1.1](https://github.com/battis/qui-cli/compare/env/2.1.0...env/2.1.1) (2025-06-23)

## [2.1.0](https://github.com/battis/qui-cli/compare/env/2.0.6...env/2.1.0) (2025-06-21)

### Features

- consistently allow no parameters to configure() ([bd4ba86](https://github.com/battis/qui-cli/commit/bd4ba8697691020b8368482f66f1124cd91926fd))

## [2.0.6](https://github.com/battis/qui-cli/compare/env/2.0.5...env/2.0.6) (2025-06-21)

### Bug Fixes

- better document environment variable loading sequence ([64aa906](https://github.com/battis/qui-cli/commit/64aa906667bb43fd6c43e6c284bf306150fc8f7e)), closes [#55](https://github.com/battis/qui-cli/issues/55)

## [2.0.5](https://github.com/battis/qui-cli/compare/env/2.0.4...env/2.0.5) (2025-06-18)

## [2.0.4](https://github.com/battis/qui-cli/compare/env/2.0.3...env/2.0.4) (2025-03-21)

### Bug Fixes

- **env:** add @qui-cli/root to plugin chain ([23b0af8](https://github.com/battis/qui-cli/commit/23b0af8701317fe4b86cd49a0fe62258e51ffbe6))

## [2.0.3](https://github.com/battis/qui-cli/compare/env/2.0.2...env/2.0.3) (2025-02-27)

### Bug Fixes

- allow creation of new .env file if not present ([c7fd3e3](https://github.com/battis/qui-cli/commit/c7fd3e35653efd1157c8ebc0e72da370561f0a92))

## [2.0.2](https://github.com/battis/qui-cli/compare/env/2.0.1...env/2.0.2) (2025-02-24)

### Bug Fixes

- ignore non-existent .env file ([7514598](https://github.com/battis/qui-cli/commit/75145984ee5cc5c081c33f9c6d44244cc2140681))

## [2.0.1](https://github.com/battis/qui-cli/compare/env/2.0.0...env/2.0.1) (2025-02-23)

### Bug Fixes

- more flexible peer dependency ([0f971e5](https://github.com/battis/qui-cli/commit/0f971e5d29b07a31020ee847c22461310eb1bbe6))

## [2.0.0](https://github.com/battis/qui-cli/compare/env/1.0.0...env/2.0.0) (2025-02-23)

### ⚠ BREAKING CHANGES

- **plugin:** async hooks

## [1.0.0](https://github.com/battis/qui-cli/compare/env/0.8.6...env/1.0.0) (2025-02-21)

### ⚠ BREAKING CHANGES

- **env,root:** move cwd config to root
- .env loading logic fixed
- reimplement as ESM module

- **env,root:** move cwd config to root ([1b34863](https://github.com/battis/qui-cli/commit/1b3486338fb1c12576c136e2b4e8654f04bfcbeb))

### Features

- reimplement as ESM module ([913b625](https://github.com/battis/qui-cli/commit/913b62515fd15fd460307e1df64128800d74d896))

### Bug Fixes

- .env loading logic fixed ([82a80d3](https://github.com/battis/qui-cli/commit/82a80d39e94a7fab165a3d3c9492d4ecf77f1bdb))

## [0.8.6](https://github.com/battis/qui-cli/compare/env/0.8.5...env/0.8.6) (2025-02-09)

### Bug Fixes

- parse explicitly if loadDotEnv is truthy ([0719408](https://github.com/battis/qui-cli/commit/0719408551f55133b04c55d287998d126e8f07c7))

## [0.8.5](https://github.com/battis/qui-cli/compare/env/0.8.4...env/0.8.5) (2025-02-09)

### Features

- allow appRoot() override, but fall back to appRoot() ([b6bdb15](https://github.com/battis/qui-cli/commit/b6bdb158d44cdd81beee441bf78b95602966e1d0))

### Bug Fixes

- parse .env during init ([2de3167](https://github.com/battis/qui-cli/commit/2de3167be47c51f9dd44aaa126a4c375631b1852))

## [0.8.4](https://github.com/battis/qui-cli/compare/env/0.8.3...env/0.8.4) (2025-02-09)

### Bug Fixes

- **env:** do not mistakenly cache old appRoot ([ecbad81](https://github.com/battis/qui-cli/commit/ecbad812d30b571d5b8291317bd075ba8d565416))

## [0.8.3](https://github.com/battis/qui-cli/compare/env/0.8.2...env/0.8.3) (2025-02-09)

## 0.8.2

### Patch Changes

- 6badb2b: fix(?) incompatibility with v0.7.x scripts
- Updated dependencies [6badb2b]
  - @qui-cli/plugin@0.1.2
  - @qui-cli/root@0.8.2

## 0.8.1

### Patch Changes

- Updated dependencies [a259210]
  - @qui-cli/plugin@0.1.1
  - @qui-cli/root@0.8.1

## 0.8.0

### Minor Changes

- 97d48ef: refactored for plugin architecture

### Patch Changes

- Updated dependencies [97d48ef]
  - @qui-cli/plugin@0.1.0
  - @qui-cli/root@0.8.0
