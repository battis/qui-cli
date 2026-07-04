# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.0.9](https://github.com/battis/typescript-config/compare/pkg-setup/0.0.8...pkg-setup/0.0.9) (2026-07-01)


### Features

* return true on setup success ([7676a7c](https://github.com/battis/typescript-config/commit/7676a7c00ee8e87ba93e1c1492a98676caae070e))

## [0.0.8](https://github.com/battis/typescript-config/compare/pkg-setup/0.0.7...pkg-setup/0.0.8) (2026-07-01)


### Features

* export types ([97aba0a](https://github.com/battis/typescript-config/commit/97aba0a3b0bbfbbba0006d9cc9bd7ef666a43449))


### Bug Fixes

* objectify FileHandler params, check against _normalized_ filename ([d6b60d4](https://github.com/battis/typescript-config/commit/d6b60d496d8075d3014c3a888f121bd70b4d0fb9))

## [0.0.7](https://github.com/battis/typescript-config/compare/pkg-setup/0.0.6...pkg-setup/0.0.7) (2026-07-01)


### Bug Fixes

* restore destired dot.dotfile behavior ([466cde7](https://github.com/battis/typescript-config/commit/466cde709716d1243d153d86da8b3e8356adb92e))

## [0.0.6](https://github.com/battis/typescript-config/compare/pkg-setup/0.0.5...pkg-setup/0.0.6) (2026-07-01)


### Features

* configurable file ignore list ([e368f14](https://github.com/battis/typescript-config/commit/e368f148f1a9127983891f699d96586f38c57f4f))
* configurable FileHandlers (defaults to handling package.json and pnpm-workspace.yaml) ([0add4b6](https://github.com/battis/typescript-config/commit/0add4b6a90084361b13271bf244b3fa535362123))


### Bug Fixes

* look for pnpm-workspace.yaml in monorepo root ([c35b992](https://github.com/battis/typescript-config/commit/c35b992ed4d0e36b10363975a34caaa442329a6d))
* merge/overwrite (rather than replace entirely) additonal configured FileHandlers ([64abd2f](https://github.com/battis/typescript-config/commit/64abd2ff6111e1aca22abf793d7c28cc4e552f3b))

## [0.0.5](https://github.com/battis/typescript-config/compare/pkg-setup/0.0.4...pkg-setup/0.0.5) (2026-06-30)


### Bug Fixes

* improved confirmation clarity ([41f4bc2](https://github.com/battis/typescript-config/commit/41f4bc2f41a7ea88aa6aebfb5ea1c43a643932fc))

## [0.0.4](https://github.com/battis/typescript-config/compare/pkg-setup/0.0.3...pkg-setup/0.0.4) (2026-06-30)


### Bug Fixes

* improve copy-diffing logic and logging ([acd23f3](https://github.com/battis/typescript-config/commit/acd23f3706696c547786611fbba6d38ed918c26a))
* streamline update logic and logging ([2750b19](https://github.com/battis/typescript-config/commit/2750b19b4b3f0e9cacd8e093b4f0f5b076fa452a))

## [0.0.3](https://github.com/battis/typescript-config/compare/pkg-setup/0.0.2...pkg-setup/0.0.3) (2026-06-30)


### Features

* use `dot.dotfile-name` notation in pkg-setup for clarity ([7f5e96d](https://github.com/battis/typescript-config/commit/7f5e96dbbcb2ff43a80f6f244513d77c99b30d50))

## [0.0.2](https://github.com/battis/typescript-config/compare/pkg-setup/0.0.1...pkg-setup/0.0.2) (2026-06-30)


### Bug Fixes

* standardize workspace package configuration ([2dac8c8](https://github.com/battis/typescript-config/commit/2dac8c859257d34117b1e14552fb9381ff45f921))

## 0.0.1 (2026-06-29)


### Features

* copy pkg-setup directory to dependent package ([10a6c2e](https://github.com/battis/typescript-config/commit/10a6c2e90728d1871dfd1d37ea1ba0d3cfcd106e))
* merge package.json keys together ([f04fb1f](https://github.com/battis/typescript-config/commit/f04fb1ff957749f77c3f61f1eac8fb2bafa402cb))
* merge pnpm-workspace.yaml ([1c4fa5d](https://github.com/battis/typescript-config/commit/1c4fa5dc0f75d0f368a1592b05c43816c3fe6c08))
