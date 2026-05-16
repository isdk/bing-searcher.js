# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## 0.1.1 (2026-05-16)


### Features

* **bing:** add Bing search engine implementation ([c72c649](https://github.com/isdk/bing-searcher.js/commit/c72c6498db409b199fad27b46dd6177f30e39b26))
* **bing:** add international option and documentation ([c0eb861](https://github.com/isdk/bing-searcher.js/commit/c0eb861733bb62f780568d3b2fe73eddc50e3a07))
* **bing:** fallback 'hour' timeRange to 'day' as Bing lacks native support ([3fbf730](https://github.com/isdk/bing-searcher.js/commit/3fbf73080bda95c56fe18aa7a5e8e6155121ddc1))
* **bing:** implement secondary fetch for precise date extraction ([b230868](https://github.com/isdk/bing-searcher.js/commit/b230868418b360de50fa5c54a240d44cc0b86123))
* **bing:** support custom date range and year timeRange ([3514997](https://github.com/isdk/bing-searcher.js/commit/35149974a847befabe046709c2df042950cb6121))


### Bug Fixes

* 通过模拟鼠标移动点击,彻底解决了bing无法搜索的问题,不过extraParams没有处理! ([2c46fc6](https://github.com/isdk/bing-searcher.js/commit/2c46fc69d4bbd36d9f4840d10eb1a19cb30fd429))
* **build:** only use current tsconfig.spec.json to test ([abad28c](https://github.com/isdk/bing-searcher.js/commit/abad28c447e45fa431bd26d666e4224db30181fe))
* wait more time for stable ([27207ff](https://github.com/isdk/bing-searcher.js/commit/27207ffc3473981bdc399d1cd4db01f55b3f070a))


### Refactor

* add index.ts ([1c8e94c](https://github.com/isdk/bing-searcher.js/commit/1c8e94c7ab56a79c8f0182a7653a42aef82b661a))
* minor changed ([af6903f](https://github.com/isdk/bing-searcher.js/commit/af6903f14e7ac597082f77156cd1a5a68eb51d2a))
* use the neww extractDate in web-searcher package ([3172464](https://github.com/isdk/bing-searcher.js/commit/317246480430dca37f47b3177c5ea86f8ff94515))
